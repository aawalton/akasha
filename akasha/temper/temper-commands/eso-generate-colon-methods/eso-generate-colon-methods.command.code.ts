import { mkdirSync, mkdtempSync, readFileSync, realpathSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { answering, refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import { codeRoot } from "@akasha/pages-system/code-root"
import { esoDocPathForLuaRoot } from "@akasha/temper-build-deploy-checks/eso-doc-api-version"
import {
  esoCloneHeaderLines,
  parseEsoDocApiVersion,
} from "@akasha/temper-eso-paths/eso-clone-stamp"
import { esouiSourceDir } from "@akasha/temper-eso-paths/eso-paths"
import { collectLuaFiles } from "@akasha/temper-eso-paths/lua-files"
// The name extraction, the Lua walk and the dividing of a census into runs still
// stand under `tools/lib`, so they are reached by the name that package's
// manifest gives them rather than by a path climbing out of akasha.
import type { SeriesSpec } from "@tools/lib/akasha-name-series"
import { byteLength, renderSeries, stageSeries } from "@tools/lib/akasha-name-series"
import { extractColonMethodNames } from "../eso-colon-methods/eso-colon-methods.module.code.ts"

const DATA = 2

const SELF = "akasha eso-generate-colon-methods"

const ESO_ROOT_FLAG = "--eso-root"

const CODE_ROOT_FLAG = "--code-root"

const STAGE_FLAG = "--stage"

const GENERATED_DIR_REL = "akasha/temper/temper-build-deploy-checks/generated"

const STEM = "eso-colon-methods"

const BINDING = "ESO_COLON_METHOD_NAMES"

const SCRATCH_PARENT = "/var/tmp"

const STAGE_PREFIX = "eso-colon-methods-stage-"

function valueOf(argv: readonly string[], flag: string): string | undefined {
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === flag) return argv[at + 1]
  }
  return undefined
}

function saidShort(thrown: unknown): string {
  return saidBy(thrown).replace(/\s+/g, " ").trim()
}

function stagingAt(named: string | undefined): string {
  if (named === undefined) return mkdtempSync(join(realpathSync(SCRATCH_PARENT), STAGE_PREFIX))
  mkdirSync(named, { recursive: true })
  return realpathSync(named)
}

export function esoGenerateColonMethods(argv: readonly string[] = []): Answer {
  const namedCheckout = valueOf(argv, CODE_ROOT_FLAG)

  let checkout: string
  try {
    checkout = realpathSync(namedCheckout ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${namedCheckout ?? codeRoot()} is no checkout on this disk, so nothing was read or staged — ${saidShort(thrown)}`,
      DATA
    )
  }

  const namedRoot = valueOf(argv, ESO_ROOT_FLAG)
  const esoRoot = namedRoot === undefined ? esouiSourceDir() : resolve(namedRoot)
  try {
    if (!statSync(esoRoot).isDirectory()) {
      return refused(`${esoRoot} is no directory, so there was no Lua source to scan`, DATA)
    }
  } catch {
    return refused(
      `${esoRoot} is not there. The game's UI source is Zenimax's and is vendored in no repository here — ` +
        "restore the peer clone with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another copy with --eso-root",
      DATA
    )
  }

  const names = new Set<string>()
  const luaFiles = collectLuaFiles(esoRoot)
  for (const file of luaFiles) {
    let text: string
    try {
      text = readFileSync(file, "utf8")
    } catch {
      continue
    }
    for (const name of extractColonMethodNames(text)) names.add(name)
  }
  if (names.size === 0) {
    return refused(
      `no colon-method stands in ${String(luaFiles.length)} Lua file(s) under ${esoRoot}. ` +
        "An empty census reads to every consumer as a clean answer, so nothing was staged.",
      DATA
    )
  }

  let apiVersion: number
  try {
    apiVersion = parseEsoDocApiVersion(readFileSync(esoDocPathForLuaRoot(esoRoot), "utf8"))
  } catch (thrown) {
    return refused(
      `the clone at ${esoRoot} states no API version, so a staged body would carry no stamp for the freshness audit to weigh — ${saidShort(thrown)}`,
      DATA
    )
  }

  const spec: SeriesSpec = {
    generatedDirRel: GENERATED_DIR_REL,
    stem: STEM,
    binding: BINDING,
    names: [...names].sort(),
    runDefinition:
      "one run of the colon-method names the base game defines, in the whole census's order",
    aggregateDefinition:
      "every colon-method name the base game defines, gathered from the runs holding them",
    provenance: [...esoCloneHeaderLines(SELF, apiVersion)],
  }

  const pages = renderSeries(checkout, spec)
  const runs = pages.length - 1
  const staged = stageSeries(
    checkout,
    spec,
    pages,
    stagingAt(valueOf(argv, STAGE_FLAG)),
    `write the base-game colon-method census from the ~/esoui clone at API ${String(apiVersion)}`
  )

  const report = [
    `read ${String(luaFiles.length)} Lua file(s) under ${esoRoot} at API version ${String(apiVersion)}`,
    `kept ${String(spec.names.length)} colon-method name(s) divided into ${String(runs)} run(s)`,
    ...pages.map((one) => `  ${String(byteLength(one.code))}\t${one.codeRel}`),
    ...staged.goneRels.map((rel) => `  gone\t${rel}`),
  ]

  if (staged.landAt === null) {
    report.push(
      "every body above already stands as this run rendered it, so there is nothing to land",
      `that is the round trip: the ${String(runs)} runs compose back to the ${String(spec.names.length)} names one file would have held`
    )
    return answering(report, [], 0)
  }

  report.push(
    `nothing has landed. ${String(staged.changed.length)} file(s) differ from what stands; to land them, run: bash ${staged.landAt}`,
    `nothing in the tree reads ${BINDING} today, so landing this stands an authority with no consumer`,
    `the temper-build-deploy-checks package manifest would want a \`./${STEM}\` entry pointing at the aggregate's code, and its workspace-package page would want every run's slug in its part slugs; nothing here writes either`
  )

  return answering(report, [], 0)
}

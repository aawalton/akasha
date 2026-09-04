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
import {
  extractGlobalNames,
  extractStringIdNames,
} from "../eso-base-game-globals/eso-base-game-globals.module.code.ts"

const DATA = 2

const SELF = "akasha eso-generate-base-game-globals"

const ESO_ROOT_FLAG = "--eso-root"

const CODE_ROOT_FLAG = "--code-root"

const STAGE_FLAG = "--stage"

const GENERATED_DIR_REL = "akasha/temper/temper-build-deploy-checks/generated"

const STEM = "eso-base-game-string-ids"

const BINDING = "ESO_BASE_GAME_STRING_IDS"

const SCRATCH_PARENT = "/var/tmp"

const STAGE_PREFIX = "eso-base-game-string-ids-stage-"

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

export function esoGenerateBaseGameGlobals(argv: readonly string[] = []): Answer {
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

  const seen = new Set<string>()
  const stringIds = new Set<string>()
  const luaFiles = collectLuaFiles(esoRoot)
  for (const file of luaFiles) {
    let text: string
    try {
      text = readFileSync(file, "utf8")
    } catch {
      continue
    }
    for (const name of [...extractGlobalNames(text), ...extractStringIdNames(text)]) {
      seen.add(name)
      if (name.startsWith("SI_")) stringIds.add(name)
    }
  }
  if (stringIds.size === 0) {
    return refused(
      `no string id stands among ${String(seen.size)} base-game name(s) in ` +
        `${String(luaFiles.length)} Lua file(s) under ${esoRoot}. An empty census reads to every ` +
        "consumer as a clean answer, so nothing was staged.",
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
    names: [...stringIds].sort(),
    runDefinition: "one run of the string ids the base game provides, in the whole census's order",
    aggregateDefinition:
      "every string id the base game provides, gathered from the runs holding them",
    provenance: [...esoCloneHeaderLines(SELF, apiVersion)],
  }

  const pages = renderSeries(checkout, spec)
  const runs = pages.length - 1
  const staged = stageSeries(
    checkout,
    spec,
    pages,
    stagingAt(valueOf(argv, STAGE_FLAG)),
    `write the base-game string-id census from the ~/esoui clone at API ${String(apiVersion)}`
  )

  const report = [
    `read ${String(luaFiles.length)} Lua file(s) under ${esoRoot} at API version ${String(apiVersion)}`,
    `saw ${String(seen.size)} base-game name(s) and kept ${String(spec.names.length)} string id(s) ` +
      `divided into ${String(runs)} run(s)`,
    ...pages.map((one) => `  ${String(byteLength(one.code))}\t${one.codeRel}`),
    ...staged.goneRels.map((rel) => `  gone\t${rel}`),
  ]

  const held = pages.find((one) => one.slug === STEM)
  if (staged.files.some((one) => one.rel === held?.pageRel && one.standing)) {
    report.push(
      `the aggregate's page stands and was not staged again, so what a hand put on ${String(held?.pageRel)} survives`
    )
  }

  if (staged.landAt === null) {
    report.push(
      "every body above already stands as this run rendered it, so there is nothing to land",
      `that is the round trip: the ${String(runs)} runs compose back to the ${String(spec.names.length)} string ids one file would have held`
    )
    return answering(report, [], 0)
  }

  report.push(
    `nothing has landed. ${String(staged.changed.length)} file(s) differ from what stands; to land them, run: bash ${staged.landAt}`,
    "a write over a body the read record does not show you read is refused, so every body above that already stands has to be read first"
  )

  const arrived = pages
    .filter((one) => one.slug !== STEM && staged.changed.includes(one.pageRel))
    .map((one) => one.slug)
  if (arrived.length > 0 || staged.goneRels.length > 0) {
    report.push(
      "the run count changed, so the temper-build-deploy-checks workspace-package page's part slugs no longer match what stands; nothing here writes that list",
      ...arrived.map((slug) => `  add     module/${slug}`),
      ...staged.goneRels.map((rel) => `  remove  ${rel}`)
    )
  }

  return answering(report, [], 0)
}

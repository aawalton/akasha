import { readFileSync, realpathSync, statSync } from "node:fs"
import { resolve } from "node:path"
import type { SeriesSpec } from "@akasha/code/name-series"
import { byteLength, renderSeries, stageSeries } from "@akasha/code/name-series"
import { codeRoot } from "@akasha/pages/code-root"
import {
  esoCloneHeaderLines,
  parseEsoDocApiVersion,
} from "akasha/temper/eso-paths/eso-clone-stamp/eso-clone-stamp.module.code.ts"
import { esouiSourceDir } from "akasha/temper/eso-paths/eso-paths/eso-paths.module.code.ts"
import { collectLuaFiles } from "akasha/temper/eso-paths/lua-files/lua-files.module.code.ts"
import { esoDocPathForLuaRoot } from "../../../../../../temper/build-deploy-checks/eso-doc-api-version/eso-doc-api-version.module.code.ts"
import { extractColonMethodNames } from "../../../../../../temper/commands/eso-colon-methods/eso-colon-methods.module.code.ts"
import {
  saidFor,
  saidShort,
  stagingAt,
} from "../../../../../../temper/commands/flag-fault-stage/flag-fault-stage.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"
import { answering, refused } from "../../../../../modules/calling/calling.module.code.ts"

const DATA = 2

const SELF = "akasha temper-eso-generate-colon-methods"

const ESO_ROOT_FLAG = "--eso-root"

const CODE_ROOT_FLAG = "--code-root"

const STAGE_FLAG = "--stage"

const GENERATED_DIR_REL = "temper/build-deploy-checks/generated"

const STEM = "eso-colon-methods"

const BINDING = "ESO_COLON_METHOD_NAMES"

const STAGE_PREFIX = "eso-colon-methods-stage-"

export function temperEsoGenerateColonMethods(argv: readonly string[] = []): Answer {
  const namedCheckout = saidFor(argv, CODE_ROOT_FLAG)

  let checkout: string
  try {
    checkout = realpathSync(namedCheckout ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${namedCheckout ?? codeRoot()} is no checkout on this disk, so nothing was read or staged — ${saidShort(thrown)}`,
      DATA
    )
  }

  const namedRoot = saidFor(argv, ESO_ROOT_FLAG)
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
      `no colon-method is in ${String(luaFiles.length)} Lua file(s) under ${esoRoot}. ` +
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
    stagingAt(saidFor(argv, STAGE_FLAG), STAGE_PREFIX),
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
      "every body above is already what this run rendered, so there is nothing to land",
      `that is the round trip: the ${String(runs)} runs compose back to the ${String(spec.names.length)} names one file would have held`
    )
    return answering(report, [], 0)
  }

  report.push(
    `nothing has landed. ${String(staged.changed.length)} file(s) differ from what is there; to land them, run: bash ${staged.landAt}`,
    `nothing in the tree reads ${BINDING} today, so landing this sets up an authority with no consumer`,
    `the temper-build-deploy-checks package manifest would want a \`./${STEM}\` entry pointing at the aggregate's code, and its workspace-package page would want every run's slug in its part slugs; nothing here writes either`
  )

  return answering(report, [], 0)
}

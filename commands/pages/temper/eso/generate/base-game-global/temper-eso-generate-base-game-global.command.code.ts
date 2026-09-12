import { readFileSync, realpathSync, statSync } from "node:fs"
import { resolve } from "node:path"
import type { SeriesSpec } from "akasha/code/name-series/name-series.module.code.ts"
import {
  byteLength,
  renderSeries,
  stageSeries,
} from "akasha/code/name-series/name-series.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import { esoRoot as esoRootArgument } from "akasha/commands/arguments/pages/eso-root.argument.ts"
import { stage as stageArgument } from "akasha/commands/arguments/pages/stage.argument.ts"
import {
  DATA,
  naming,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  esoAnswering,
  type Generating,
  type Taking,
} from "akasha/commands/modules/eso-answering/eso-answering.module.code.ts"
import { temperEsoGenerateBaseGameGlobal as page } from "akasha/commands/pages/temper/eso/generate/base-game-global/temper-eso-generate-base-game-global.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { esoDocPathForLuaRoot } from "akasha/temper/build-deploy-checks/eso-doc-api-version/eso-doc-api-version.module.code.ts"
import {
  extractGlobalNames,
  extractStringIdNames,
} from "akasha/temper/commands/eso-base-game-globals/eso-base-game-globals.module.code.ts"
import {
  saidShort,
  stagingAt,
} from "akasha/temper/commands/flag-fault-stage/flag-fault-stage.module.code.ts"
import {
  esoCloneHeaderLines,
  parseEsoDocApiVersion,
} from "akasha/temper/eso-paths/eso-clone-stamp/eso-clone-stamp.module.code.ts"
import { esouiSourceDir } from "akasha/temper/eso-paths/eso-paths/eso-paths.module.code.ts"
import { collectLuaFiles } from "akasha/temper/eso-paths/lua-files/lua-files.module.code.ts"

const NAMED = [codeRootArgument, stageArgument, esoRootArgument]

const GENERATED_DIR_REL = "temper/build-deploy-checks"

const STEM = "eso-base-game-string-ids"

const BINDING = "ESO_BASE_GAME_STRING_IDS"

const STAGE_PREFIX = "eso-base-game-string-ids-stage-"

type Taken = Taking<typeof page, typeof NAMED>

export type Staging = Generating<Taken>

export async function staging(
  argv: readonly string[],
  given: Given,
  stagingWork: Staging = staged
): Promise<Answer> {
  return await esoAnswering(argv, given, page, NAMED, async (done, taken, each) =>
    naming(done, await stagingWork(done, taken, each))
  )
}

export function temperEsoGenerateBaseGameGlobal(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return staging(argv, given)
}

function staged(done: string[], taken: Taken, given: Given): Answer {
  const namedCheckout = taken.codeRoot

  let checkout: string
  try {
    checkout = realpathSync(namedCheckout ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${namedCheckout ?? codeRoot()} is no checkout on this disk, so nothing was read or staged — ${saidShort(thrown)}`,
      DATA
    )
  }

  const namedRoot = taken.esoRoot
  const esoRoot = namedRoot === undefined ? esouiSourceDir() : resolve(namedRoot)
  try {
    if (!statSync(esoRoot).isDirectory()) {
      return refused(`${esoRoot} is no directory, so there was no Lua source to scan`, DATA)
    }
  } catch {
    return refused(
      `${esoRoot} is not there. The game's UI source is Zenimax's and is vendored in no repository here — ` +
        `restore the peer clone with \`git clone https://github.com/esoui/esoui.git ~/esoui\`, or name another copy with ${esoRootArgument.said}`,
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
      `no string id is among ${String(seen.size)} base-game name(s) in ` +
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
    provenance: [...esoCloneHeaderLines(given.calledAs, apiVersion)],
  }

  const pages = renderSeries(checkout, spec)
  const runs = pages.length - 1
  const put = stageSeries(
    checkout,
    spec,
    pages,
    stagingAt(taken.stage, STAGE_PREFIX, done),
    `write the base-game string-id census from the ~/esoui clone at API ${String(apiVersion)}`,
    done
  )

  const report = [
    `read ${String(luaFiles.length)} Lua file(s) under ${esoRoot} at API version ${String(apiVersion)}`,
    `saw ${String(seen.size)} base-game name(s) and kept ${String(spec.names.length)} string id(s) ` +
      `divided into ${String(runs)} run(s)`,
    ...pages.map((one) => `  ${String(byteLength(one.code))}\t${one.codeRel}`),
    ...put.goneRels.map((rel) => `  gone\t${rel}`),
  ]

  const held = pages.find((one) => one.slug === STEM)
  if (put.files.some((one) => one.rel === held?.pageRel && one.alreadyThere)) {
    report.push(
      `the aggregate's page is there and was not staged again, so what a hand put on ${String(held?.pageRel)} survives`
    )
  }

  if (put.landAt === null) {
    report.push(
      "every body above is already what this run rendered, so there is nothing to land",
      `that is the round trip: the ${String(runs)} runs compose back to the ${String(spec.names.length)} string ids one file would have held`
    )
    return told(report)
  }

  report.push(
    `nothing has landed. ${String(put.changed.length)} file(s) differ from what is there; to land them, run: bash ${put.landAt}`,
    "a write over a body the read record does not show you read is refused, so every body above that is already there has to be read first"
  )

  const arrived = pages
    .filter((one) => one.slug !== STEM && put.changed.includes(one.pageRel))
    .map((one) => one.slug)
  if (arrived.length > 0 || put.goneRels.length > 0) {
    report.push(
      "the run count changed, so the temper-build-deploy-checks workspace-package page's part slugs no longer match what is there; nothing here writes that list",
      ...arrived.map((slug) => `  add     module/${slug}`),
      ...put.goneRels.map((rel) => `  remove  ${rel}`)
    )
  }

  return told(report)
}

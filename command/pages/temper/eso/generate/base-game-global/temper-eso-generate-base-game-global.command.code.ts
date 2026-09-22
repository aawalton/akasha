import { readFileSync, realpathSync, statSync } from "node:fs"
import { resolve } from "node:path"
import type { SeriesSpec } from "akasha/code/module/modules/name-series/name-series.module.code.ts"
import {
  byteLength,
  renderSeries,
  stageSeries,
} from "akasha/code/module/modules/name-series/name-series.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import { esoRoot as esoRootArgument } from "akasha/command/argument/pages/eso-root.argument.ts"
import { stage as stageArgument } from "akasha/command/argument/pages/stage.argument.ts"
import {
  DATA,
  naming,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Generating,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperEsoGenerateBaseGameGlobal as page } from "akasha/command/pages/temper/eso/generate/base-game-global/temper-eso-generate-base-game-global.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { esoDocPathForLuaRoot } from "akasha/temper/addon/build/deploy-check/modules/eso-doc-api-version/eso-doc-api-version.module.code.ts"
import {
  extractGlobalNames,
  extractStringIdNames,
} from "akasha/temper/command/modules/eso-base-game-globals/eso-base-game-globals.module.code.ts"
import {
  saidShort,
  stagingAt,
} from "akasha/temper/command/modules/flag-fault-stage/flag-fault-stage.module.code.ts"
import { parseEsoDocApiVersion } from "akasha/temper/eso/path/modules/eso-clone-stamp/eso-clone-stamp.module.code.ts"
import { esouiSourceDir } from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import { collectLuaFiles } from "akasha/temper/eso/path/modules/lua-files/lua-files.module.code.ts"

const NAMED = [codeRootArgument, stageArgument, esoRootArgument]

const GENERATED_DIR_REL = "temper/addon/build/deploy-check/modules"

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
  return await answeredByPage(argv, given.calledAs, page, NAMED, async (taken, done) =>
    naming(done, await stagingWork(done, taken, given))
  )
}

export function temperEsoGenerateBaseGameGlobal(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return staging(argv, given)
}

function staged(done: string[], taken: Taken): Answer {
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
      `the clone at ${esoRoot} states no API version, so the landing would not say which version the census was read at — ${saidShort(thrown)}`,
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
      "the run count changed, so the temper-addon-deploy-check domain page's part slugs no longer match what is there; nothing here writes that list",
      ...arrived.map((slug) => `  add     module/${slug}`),
      ...put.goneRels.map((rel) => `  remove  ${rel}`)
    )
  }

  return told(report)
}

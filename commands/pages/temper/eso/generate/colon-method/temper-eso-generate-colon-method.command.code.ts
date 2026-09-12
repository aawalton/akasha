import { readFileSync, realpathSync, statSync } from "node:fs"
import { resolve } from "node:path"
import type { SeriesSpec } from "akasha/code/name-series/name-series.module.code.ts"
import {
  byteLength,
  renderSeries,
  stageSeries,
} from "akasha/code/name-series/name-series.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import { esoRoot } from "akasha/commands/arguments/pages/eso-root.argument.ts"
import { stage } from "akasha/commands/arguments/pages/stage.argument.ts"
import {
  DATA,
  naming,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  esoAnswering,
  type Taking,
} from "akasha/commands/pages/temper/eso/eso-answering/eso-answering.module.code.ts"
import { temperEsoGenerateColonMethod as page } from "akasha/commands/pages/temper/eso/generate/colon-method/temper-eso-generate-colon-method.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { esoDocPathForLuaRoot } from "akasha/temper/build-deploy-checks/eso-doc-api-version/eso-doc-api-version.module.code.ts"
import { extractColonMethodNames } from "akasha/temper/commands/eso-colon-methods/eso-colon-methods.module.code.ts"
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

const NAMED = [codeRootArgument, stage, esoRoot]

const GENERATED_DIR_REL = "temper/build-deploy-checks"

const STEM = "eso-colon-methods"

const BINDING = "ESO_COLON_METHOD_NAMES"

const STAGE_PREFIX = "eso-colon-methods-stage-"

type Taken = Taking<typeof page, typeof NAMED>

export type Staging = (done: string[], taken: Taken, given: Given) => Answer

export async function methoding(
  argv: readonly string[],
  given: Given,
  staging: Staging = staged
): Promise<Answer> {
  return await esoAnswering(argv, given, page, NAMED, (done, taken) =>
    naming(done, staging(done, taken, given))
  )
}

export function temperEsoGenerateColonMethod(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return methoding(argv, given)
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
  const luaRoot = namedRoot === undefined ? esouiSourceDir() : resolve(namedRoot)
  try {
    if (!statSync(luaRoot).isDirectory()) {
      return refused(`${luaRoot} is no directory, so there was no Lua source to scan`, DATA)
    }
  } catch {
    return refused(
      `${luaRoot} is not there. The game's UI source is Zenimax's and is vendored in no repository here — ` +
        "restore the peer clone with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name " +
        `another copy with ${esoRoot.said}`,
      DATA
    )
  }

  const names = new Set<string>()
  const luaFiles = collectLuaFiles(luaRoot)
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
      `no colon-method is in ${String(luaFiles.length)} Lua file(s) under ${luaRoot}. ` +
        "An empty census reads to every consumer as a clean answer, so nothing was staged.",
      DATA
    )
  }

  let apiVersion: number
  try {
    apiVersion = parseEsoDocApiVersion(readFileSync(esoDocPathForLuaRoot(luaRoot), "utf8"))
  } catch (thrown) {
    return refused(
      `the clone at ${luaRoot} states no API version, so a staged body would carry no stamp for the freshness audit to weigh — ${saidShort(thrown)}`,
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
    provenance: [...esoCloneHeaderLines(given.calledAs, apiVersion)],
  }

  const pages = renderSeries(checkout, spec)
  const runs = pages.length - 1
  const put = stageSeries(
    checkout,
    spec,
    pages,
    stagingAt(taken.stage, STAGE_PREFIX, done),
    `write the base-game colon-method census from the ~/esoui clone at API ${String(apiVersion)}`,
    done
  )

  const report = [
    `read ${String(luaFiles.length)} Lua file(s) under ${luaRoot} at API version ${String(apiVersion)}`,
    `kept ${String(spec.names.length)} colon-method name(s) divided into ${String(runs)} run(s)`,
    ...pages.map((one) => `  ${String(byteLength(one.code))}\t${one.codeRel}`),
    ...put.goneRels.map((rel) => `  gone\t${rel}`),
  ]

  if (put.landAt === null) {
    report.push(
      "every body above is already what this run rendered, so there is nothing to land",
      `that is the round trip: the ${String(runs)} runs compose back to the ${String(spec.names.length)} names one file would have held`
    )
    return told(report)
  }

  report.push(
    `nothing has landed. ${String(put.changed.length)} file(s) differ from what is there; to land them, run: bash ${put.landAt}`,
    `nothing in the tree reads ${BINDING} today, so landing this sets up an authority with no consumer`,
    `the temper-build-deploy-checks package manifest would want a \`./${STEM}\` entry pointing at the aggregate's code, and its workspace-package page would want every run's slug in its part slugs; nothing here writes either`
  )

  return told(report)
}

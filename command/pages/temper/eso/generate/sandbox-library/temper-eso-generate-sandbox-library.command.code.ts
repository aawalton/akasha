import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import { savedVariablesFile as savedVariablesFileArgument } from "akasha/command/argument/pages/saved-variables-file.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { captureTextAt } from "akasha/command/pages/temper/eso/generate/modules/capture-text/capture-text.module.code.ts"
import { temperEsoGenerateSandboxLibrary as page } from "akasha/command/pages/temper/eso/generate/sandbox-library/temper-eso-generate-sandbox-library.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  sandboxLibraryBody,
  sandboxLibraryIn,
} from "akasha/temper/addon/build/deploy-check/modules/sandbox-library-reading/sandbox-library-reading.module.code.ts"
import { resolveSavedVariablesPath } from "akasha/temper/catalog/side-file/modules/catalog-file-paths/catalog-file-paths.module.code.ts"

const NAMED = [codeRootArgument, savedVariablesFileArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const TABLE = "temper/addon/build/deploy-check/modules/sandbox-library/sandbox-library.data-table"

const AT = `${TABLE}.data.json`

const PAGE_AT = `${TABLE}.ts`

const STATES_DATA = '\n  data: "json",\n'

const BEFORE_DECISIONS = "\n  decisions: ["

const MESSAGE = "Write the game's Lua sandbox from the game's capture"

type Taken = Taking<typeof page, typeof NAMED>

export function pageStatingData(was: string): string {
  if (was.includes(STATES_DATA)) return was
  return was.replace(BEFORE_DECISIONS, `${STATES_DATA.slice(0, -1)}${BEFORE_DECISIONS}`)
}

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const from = resolveSavedVariablesPath(taken.savedVariablesFile)
  let capture: string
  try {
    capture = await readFile(from, "utf8")
  } catch {
    return refused(`\`${from}\` is no file this can read, so there is no capture to write`, DATA)
  }

  const held = sandboxLibraryIn(capture)
  if (held === undefined) {
    return refused(
      `\`${from}\` carries no sandbox library, so the table was left as it is` +
        " — the game collects it when the catalog add-on next loads",
      DATA
    )
  }

  const tablePage = await captureTextAt(join(root, PAGE_AT))
  if (tablePage === null) {
    return refused(`no page is at \`${PAGE_AT}\`, so the table has nowhere to land`, DATA)
  }

  const body = sandboxLibraryBody(held)
  const was = await captureTextAt(join(root, AT))
  if (was === body) {
    return told([
      `\`${AT}\` already holds what the capture says, so nothing landed`,
      `read from ${from} at API version ${String(held.apiVersion)}`,
    ])
  }

  const stating = pageStatingData(tablePage)
  const asked: readonly Asking[] =
    stating === tablePage
      ? [{ at: PUT, given: { at: AT, body } }]
      : [
          { at: PUT, given: { at: PAGE_AT, body: stating } },
          { at: PUT, given: { at: AT, body } },
        ]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the sandbox was not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return refused(
      `\`${AT}\` differs from the capture and nothing landed — ${landed.said.join("; ")}`,
      OPERATIONAL
    )
  }

  return told([
    `${String(Object.keys(held.globals).length)} global(s) and ` +
      `${String(Object.keys(held.libraries).length)} standard library(s) landed in \`${AT}\``,
    `read from ${from} at API version ${String(held.apiVersion)}`,
  ])
}

export function temperEsoGenerateSandboxLibrary(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}

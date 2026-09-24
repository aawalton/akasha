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
import { temperEsoGenerateStrings as page } from "akasha/command/pages/temper/eso/generate/strings/temper-eso-generate-strings.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { resolveSavedVariablesPath } from "akasha/temper/catalog/side-file/modules/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  engineStringsIn,
  stringsBody,
} from "akasha/temper/eso/string/modules/engine-strings-reading/engine-strings-reading.module.code.ts"
import { STRINGS_AT } from "akasha/temper/eso/string/modules/engine-strings-seeding/engine-strings-seeding.module.code.ts"

const NAMED = [codeRootArgument, savedVariablesFileArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE = "Write the text of the game's interface strings from the game's capture"

type Taken = Taking<typeof page, typeof NAMED>

async function captureAt(from: string): Promise<string | null> {
  try {
    return await readFile(from, "utf8")
  } catch {
    return null
  }
}

async function stringsWritten(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const from = resolveSavedVariablesPath(taken.savedVariablesFile)
  const capture = await captureAt(from)
  if (capture === null) {
    return refused(`\`${from}\` is no file this can read, so there is no capture to write`, DATA)
  }

  const held = engineStringsIn(capture)
  const count = held === undefined ? 0 : Object.keys(held.strings).length
  if (held === undefined || count === 0) {
    return refused(
      `\`${from}\` carries no interface strings, so the table was left as it is` +
        " — the game collects them when it next reloads",
      DATA
    )
  }

  const body = stringsBody(held)
  const said = `read from ${from} at API version ${String(held.apiVersion)}`
  if ((await captureAt(join(root, STRINGS_AT))) === body) {
    return told([`\`${STRINGS_AT}\` already holds what the capture says, so nothing landed`, said])
  }

  const asked: readonly Asking[] = [{ at: PUT, given: { at: STRINGS_AT, body } }]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the strings were not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return refused(
      `\`${STRINGS_AT}\` differs from the capture and nothing landed — ${landed.said.join("; ")}`,
      OPERATIONAL
    )
  }
  return told([`${String(count)} string(s) landed in \`${STRINGS_AT}\``, said])
}

export function temperEsoGenerateStrings(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => stringsWritten(taken, given))
}

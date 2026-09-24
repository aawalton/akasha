import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
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
import { temperEsoGenerateAskings as page } from "akasha/command/pages/temper/eso/generate/askings/temper-eso-generate-askings.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import {
  askingsCode,
  playerAskingsIn,
} from "akasha/temper/capture/player-answer/modules/player-askings-reading/player-askings-reading.module.code.ts"
import { esouiDocPath } from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"

export const ASKINGS_AT =
  "temper/capture/player-answer/modules/player-askings/player-askings.data-table.code.ts"

const NAMED = [codeRootArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE = "Write which functions a capture of the character asks"

type Taken = Taking<typeof page, typeof NAMED>

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const from = esouiDocPath()
  let doc: string
  try {
    doc = await readFile(from, "utf8")
  } catch {
    return refused(`\`${from}\` is no file this can read, so there is nothing to write`, DATA)
  }

  const held = playerAskingsIn(doc)
  const names = Object.values(held).flat()
  if (names.length === 0) {
    return refused(`\`${from}\` names no function a capture asks, so the table was left`, DATA)
  }

  const body = askingsCode(held)
  const asked: readonly Asking[] = [{ at: PUT, given: { at: ASKINGS_AT, body } }]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the askings were not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return told([`\`${ASKINGS_AT}\` already holds what the documentation says, so nothing landed`])
  }
  return told([
    `${String(names.length)} function(s) landed in \`${ASKINGS_AT}\``,
    `under ${String(Object.keys(held).length)} shape(s), read from ${from}`,
  ])
}

export function temperEsoGenerateAskings(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}

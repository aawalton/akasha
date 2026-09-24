import { realpathSync } from "node:fs"
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
import { temperEsoGenerateAnswers as page } from "akasha/command/pages/temper/eso/generate/answers/temper-eso-generate-answers.command.ts"
import { captureTextAt } from "akasha/command/pages/temper/eso/generate/modules/capture-text/capture-text.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { resolveSavedVariablesPath } from "akasha/temper/catalog/side-file/modules/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  answersBody,
  engineAnswersIn,
} from "akasha/temper/eso/return/modules/engine-answers-reading/engine-answers-reading.module.code.ts"
import { ANSWERS_AT } from "akasha/temper/eso/return/modules/engine-answers-seeding/engine-answers-seeding.module.code.ts"

const NAMED = [codeRootArgument, savedVariablesFileArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE = "Write what the running game answered its functions from the game's capture"

type Taken = Taking<typeof page, typeof NAMED>

async function answersWritten(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const from = resolveSavedVariablesPath(taken.savedVariablesFile)
  const capture = await captureTextAt(from)
  if (capture === null) {
    return refused(`\`${from}\` is no file this can read, so there is no capture to write`, DATA)
  }

  const held = engineAnswersIn(capture)
  const count = held === undefined ? 0 : Object.keys(held.answers).length
  if (held === undefined || count === 0) {
    return refused(
      `\`${from}\` carries no answers, so the table was left as it is` +
        " — the game collects them when it next reloads",
      DATA
    )
  }

  const body = answersBody(held)
  const said = `read from ${from} at API version ${String(held.apiVersion)}`
  if ((await captureTextAt(join(root, ANSWERS_AT))) === body) {
    return told([`\`${ANSWERS_AT}\` already holds what the capture says, so nothing landed`, said])
  }

  const asked: readonly Asking[] = [{ at: PUT, given: { at: ANSWERS_AT, body } }]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the answers were not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return refused(
      `\`${ANSWERS_AT}\` differs from the capture and nothing landed — ${landed.said.join("; ")}`,
      OPERATIONAL
    )
  }
  return told([`${String(count)} function(s) landed in \`${ANSWERS_AT}\``, said])
}

export function temperEsoGenerateAnswers(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => answersWritten(taken, given))
}

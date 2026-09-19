import { resolve } from "node:path"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyRecord } from "akasha/change/mechanical/file-content/remove/remove-property-record/remove-property-record.change-mechanical-file-content.ts"
import { partsOf } from "akasha/change/runner/modules/change-loading/change-loading.module.code.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { page as pageArgument } from "akasha/command/argument/pages/page.argument.ts"
import { statement } from "akasha/command/argument/pages/statement.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { gapDelete as commandPage } from "akasha/command/pages/gap/delete/gap-delete.command.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const CARRIES = `${changeMechanicalFileContent.slug}/${removePropertyRecord.slug}` as const

const DECISIONS = "decisions"

const STATEMENT = "statement"

const DECISION_KIND = "decisionKind"

const GAP = "gap"

const NO_STATEMENT = "the statement said is empty, and a gap is named by the statement it states"

export type Asked = {
  readonly page: string
  readonly statement: string
}

export function noAddress(named: string): string {
  return `\`${named}\` names no page — a page is named by its page type and its slug`
}

export function noPage(named: string): string {
  return `\`${named}\` is filed nowhere, so it states no gap`
}

export function noGap(asked: Asked): string {
  return `${asked.page} states no gap saying \`${asked.statement}\``
}

export function wrongIn(asked: Asked): readonly string[] {
  const wrong: string[] = []
  if (asked.statement.trim() === "") wrong.push(NO_STATEMENT)
  if (partsOf(asked.page) === null) wrong.push(noAddress(asked.page))
  return wrong
}

export function gapThere(value: Value, said: string): boolean {
  for (const one of recordsIn(value[DECISIONS])) {
    if (textAt(one, STATEMENT) !== said) continue
    const kind = one[DECISION_KIND]
    if (typeof kind === "string" && slugOf(kind) === GAP) return true
  }
  return false
}

export function messageFor(asked: Asked): string {
  return `take the gap \`${asked.statement}\` out of ${asked.page}`
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const gone = `${asked.page}: the gap \`${asked.statement}\` is gone`
  return commit === null ? [gone] : [gone, commit]
}

async function taken(
  done: string[],
  root: string,
  at: string,
  asked: Asked,
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [{ at: CARRIES, given: { at, key: DECISIONS, where: STATEMENT, is: asked.statement } }],
    messageFor(asked),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(asked, landed.commit)])
}

export type Dropping = (done: string[], asked: Asked, given: Given) => Promise<Answer>

async function dropped(done: string[], asked: Asked, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const parted = partsOf(asked.page)
  if (parted === null) return mistaking([noAddress(asked.page)])
  const one = listedAt(root, parted[0], parted[1])[0]
  if (one === undefined) return mistaking([noPage(asked.page)])
  const value = valueByPath(root, one.path)
  if (value === null || !gapThere(value, asked.statement)) return mistaking([noGap(asked)])
  return await taken(done, root, one.path, asked, given)
}

export async function droppedBy(
  asked: Asked,
  given: Given,
  dropping: Dropping = dropped
): Promise<Answer> {
  return await answering(async (done) => await dropping(done, asked, given))
}

export async function gapDelete(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, commandPage, [pageArgument, statement])
  if ("refused" in read) return mistaking([...read.refused])
  const asked: Asked = { page: read.taken.page, statement: read.taken.statement }
  const wrong = wrongIn(asked)
  if (wrong.length > 0) return mistaking(wrong)
  return await droppedBy(asked, given)
}

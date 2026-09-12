import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { initiative } from "akasha/commands/arguments/pages/initiative.argument.ts"
import { statement } from "akasha/commands/arguments/pages/statement.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativeDeleteIntent as page } from "akasha/commands/pages/initiative/delete-intent/initiative-delete-intent.command.ts"
import { initiativesDrawn } from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"

const CARRIES = "change-mechanical-file-content/remove-property-record"

const INTENTS = "intents"

const STATEMENT = "statement"

const NO_STATEMENT =
  "the statement said is empty, and an intent is named by the statement it states"

export type Asked = {
  readonly slug: string
  readonly statement: string
}

export function wrongIn(asked: Asked): readonly string[] {
  return asked.statement.trim() === "" ? [NO_STATEMENT] : []
}

export function noInitiative(slug: string): string {
  return `\`${slug}\` names no initiative, so it holds no intents to take one out of`
}

export function messageFor(asked: Asked): string {
  return `take the intent \`${asked.statement}\` out of ${asked.slug}`
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const gone = `${asked.slug}: the intent \`${asked.statement}\` is gone`
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
    [{ at: CARRIES, given: { at, key: INTENTS, where: STATEMENT, is: asked.statement } }],
    messageFor(asked),
    given.agentId,
    { writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(asked, landed.commit)])
}

export type Dropping = (done: string[], asked: Asked, given: Given) => Promise<Answer>

async function dropped(done: string[], asked: Asked, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const one = initiativesDrawn(root).find((each) => each.slug === asked.slug)
  if (one === undefined) return mistaking([noInitiative(asked.slug)])
  return await taken(done, root, one.path, asked, given)
}

export async function droppedBy(
  asked: Asked,
  given: Given,
  dropping: Dropping = dropped
): Promise<Answer> {
  return await answering(async (done) => await dropping(done, asked, given))
}

export async function initiativeDeleteIntent(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [initiative, statement])
  if ("refused" in read) return mistaking([...read.refused])
  const asked: Asked = { slug: read.taken.initiative, statement: read.taken.statement }
  const wrong = wrongIn(asked)
  if (wrong.length > 0) return mistaking(wrong)
  return await droppedBy(asked, given)
}

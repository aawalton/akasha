import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { fromInitiative } from "akasha/commands/arguments/pages/from-initiative.argument.ts"
import { statement as statementArgument } from "akasha/commands/arguments/pages/statement.argument.ts"
import { toInitiative } from "akasha/commands/arguments/pages/to-initiative.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativeHandIntent as page } from "akasha/commands/pages/initiative/hand-intent/initiative-hand-intent.command.ts"
import {
  type InitiativeIntent,
  type InitiativeRow,
  initiativesDrawn,
} from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"

const PUT = "change-mechanical-file-content/add-property-record"

const TOOK = "change-mechanical-file-content/remove-property-record"

const INTENTS = "intents"

const STATEMENT = "statement"

const NO_STATEMENT =
  "the statement said is empty, and an intent is named by the statement it states"

export type Asked = {
  readonly from: string
  readonly statement: string
  readonly to: string
}

export function wrongIn(asked: Asked): readonly string[] {
  if (asked.statement.trim() === "") return [NO_STATEMENT]
  if (asked.from !== asked.to) return []
  return [`\`${asked.from}\` is named twice, and an intent is handed to another initiative`]
}

export function noInitiative(slug: string): string {
  return `\`${slug}\` names no initiative`
}

export function noIntent(asked: Asked): string {
  return `no intent of \`${asked.from}\` states \`${asked.statement}\``
}

export function manyIntents(asked: Asked, found: number): string {
  return `${found} intents of \`${asked.from}\` state \`${asked.statement}\`, and one run hands one over`
}

export function heldAlready(asked: Asked): string {
  return `\`${asked.to}\` states an intent saying \`${asked.statement}\` already`
}

export function recordFor(one: InitiativeIntent): string {
  const statement = `${STATEMENT}: ${JSON.stringify(one.statement)}`
  if (one.workingMemory === null) return `{ ${statement} }`
  return `{ ${statement}, workingMemory: ${JSON.stringify(one.workingMemory)} }`
}

export function messageFor(asked: Asked): string {
  return `hand the intent \`${asked.statement}\` from ${asked.from} to ${asked.to}`
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const reached = `${asked.to} states the intent \`${asked.statement}\`, and ${asked.from} no longer does`
  return commit === null ? [reached] : [reached, commit]
}

export function statingIn(row: InitiativeRow, statement: string): readonly InitiativeIntent[] {
  return row.intents.filter((one) => one.statement === statement)
}

async function overTo(
  done: string[],
  root: string,
  from: InitiativeRow,
  to: InitiativeRow,
  one: InitiativeIntent,
  asked: Asked,
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [
      { at: PUT, given: { at: to.path, key: INTENTS, record: recordFor(one) } },
      { at: TOOK, given: { at: from.path, key: INTENTS, where: STATEMENT, is: asked.statement } },
    ],
    messageFor(asked),
    given.agentId,
    { writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(asked, landed.commit)])
}

export type Handing = (done: string[], asked: Asked, given: Given) => Promise<Answer>

async function handed(done: string[], asked: Asked, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const drawn = initiativesDrawn(root)
  const from = drawn.find((each) => each.slug === asked.from)
  const to = drawn.find((each) => each.slug === asked.to)
  const missing = [
    ...(from === undefined ? [noInitiative(asked.from)] : []),
    ...(to === undefined ? [noInitiative(asked.to)] : []),
  ]
  if (from === undefined || to === undefined) return mistaking(missing)
  const found = statingIn(from, asked.statement)
  const one = found[0]
  if (one === undefined) return mistaking([noIntent(asked)])
  if (found.length > 1) return mistaking([manyIntents(asked, found.length)])
  if (statingIn(to, asked.statement).length > 0) return mistaking([heldAlready(asked)])
  return await overTo(done, root, from, to, one, asked, given)
}

export async function handedBy(
  asked: Asked,
  given: Given,
  handing: Handing = handed
): Promise<Answer> {
  return await answering(async (done) => await handing(done, asked, given))
}

export async function initiativeHandIntent(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    fromInitiative,
    statementArgument,
    toInitiative,
  ])
  if ("refused" in read) return mistaking([...read.refused])
  const asked: Asked = {
    from: read.taken.fromInitiative,
    statement: read.taken.statement,
    to: read.taken.toInitiative,
  }
  const wrong = wrongIn(asked)
  if (wrong.length > 0) return mistaking(wrong)
  return await handedBy(asked, given)
}

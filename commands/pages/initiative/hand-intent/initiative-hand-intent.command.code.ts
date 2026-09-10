import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type InitiativeIntent,
  type InitiativeRow,
  initiativesDrawn,
} from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { whyOf } from "../../../modules/fault-saying/fault-saying.module.code.ts"

const PUT = "change-mechanical-file-content/add-property-record"

const TOOK = "change-mechanical-file-content/remove-property-record"

const INTENTS = "intents"

const STATEMENT = "statement"

const TAKES =
  "this takes three words: the initiative handing an intent over, the statement that intent states and the initiative taking it"

const NO_STATEMENT =
  "the statement said is empty, and an intent is named by the statement it states"

export type Asked = {
  readonly from: string
  readonly statement: string
  readonly to: string
}

export type Read = Asked | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const from = argv[0]
  const statement = argv[1]
  const to = argv[2]
  if (from === undefined || statement === undefined || to === undefined || argv.length !== 3) {
    return { refused: [`${TAKES}, and ${argv.length} arrived`] }
  }
  if (statement.trim() === "") return { refused: [NO_STATEMENT] }
  if (from === to) {
    return {
      refused: [`\`${from}\` is named twice, and an intent is handed to another initiative`],
    }
  }
  return { from, statement, to }
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

async function handed(
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
    { writer: given.writer }
  )
  if ("refusals" in landed) return { report: [], refusals: [...landed.refusals], code: 2 }
  return { report: [...saidFor(asked, landed.commit)], refusals: [], code: 0 }
}

export async function initiativeHandIntent(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: [...read.refused], code: 1 }
  try {
    const root = resolve(given.root)
    const drawn = initiativesDrawn(root)
    const from = drawn.find((each) => each.slug === read.from)
    const to = drawn.find((each) => each.slug === read.to)
    const missing = [
      ...(from === undefined ? [noInitiative(read.from)] : []),
      ...(to === undefined ? [noInitiative(read.to)] : []),
    ]
    if (from === undefined || to === undefined) {
      return { report: [], refusals: missing, code: 2 }
    }
    const found = statingIn(from, read.statement)
    const one = found[0]
    if (one === undefined) return { report: [], refusals: [noIntent(read)], code: 2 }
    if (found.length > 1) {
      return { report: [], refusals: [manyIntents(read, found.length)], code: 2 }
    }
    if (statingIn(to, read.statement).length > 0) {
      return { report: [], refusals: [heldAlready(read)], code: 2 }
    }
    return await handed(root, from, to, one, read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}

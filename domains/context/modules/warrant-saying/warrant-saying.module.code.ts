import { reachOf } from "akasha/agents/read-record/read-record.module.code.ts"
import type {
  Owing,
  Warrant,
} from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"

const READING = "akasha read"

const FLAG = "--file-path"

export const READS = "This one call reads every page named above:"

const DECIDING =
  "NAMING DECISION — this call was refused and wrote nothing. Reading the term's page clears it."

const REWORD = "The judgement is yours: reword where you meant a sense the term bars."

const AGAIN = [
  "Where you meant a sense it keeps, change nothing and run this same call again.",
  "That page is recorded as read now, so this term will not stop the call twice.",
].join("\n")

const TABOO_TERM = "taboo-term"

export function fromTabooTerm(warrant: Warrant): boolean {
  return partedIn(warrant.path)?.pageType === TABOO_TERM
}

export function callOf(paths: readonly string[]): string {
  const once = [...new Set(paths)]
  return `  ${READING} ${once.map((one) => `${FLAG} ${one}`).join(" ")}`
}

export function notReadOf(warrant: Warrant): string {
  return [`${warrant.path} — the record does not show you read this.`, warrant.owed].join("\n")
}

export function againOf(held: number): string {
  const owed = held === 1 ? "one more page is owed" : `${held} more pages are owed`
  return `${owed} than one answer holds — read what is named above, then run this call again and it names the rest.`
}

function movedSaid(warrant: Warrant, held: string): string {
  return `Your record holds ${held}, and ${warrant.oid} is there now.`
}

function farSaid(reach: number): string {
  return `Your record holds line ${reach} as how far this body has reached you.`
}

export function movedOf(warrant: Warrant, held: string): string {
  return [
    `${warrant.path} — you read this, and it has changed since.`,
    movedSaid(warrant, held),
    warrant.owed,
  ].join("\n")
}

export function partlyOf(warrant: Warrant, reach: number): string {
  return [
    `${warrant.path} — part of this reached you, and the rest has not.`,
    farSaid(reach),
    warrant.owed,
  ].join("\n")
}

function tabooSaid(owing: Owing): readonly string[] {
  const warrant = owing.warrant
  const reach = reachOf(owing.reach)
  if (reach !== null) {
    return [`${warrant.path} states the term, and part of it has reached you.`, farSaid(reach)]
  }
  if (owing.held === null) return [`${warrant.path} states the term.`]
  return [
    `${warrant.path} states the term, and it has changed since you read it.`,
    movedSaid(warrant, owing.held),
  ]
}

export function tabooOf(owing: Owing, body: string | null): string {
  const warrant = owing.warrant
  if (body === null) return [DECIDING, ...tabooSaid(owing), warrant.owed, REWORD].join("\n")
  const states = `${warrant.path} states the term, and the whole page follows.`
  return [DECIDING, states, warrant.owed, "", body.trimEnd(), "", REWORD, AGAIN].join("\n")
}

export function sayingOf(owing: Owing, body: string | null = null): string {
  if (fromTabooTerm(owing.warrant)) return tabooOf(owing, body)
  const reach = reachOf(owing.reach)
  if (reach !== null) return partlyOf(owing.warrant, reach)
  return owing.held === null ? notReadOf(owing.warrant) : movedOf(owing.warrant, owing.held)
}

import type { DepSentence, DepToken } from "../dependency-graph/dependency-graph.module.code.ts"
import { byId, childrenByRel, lower } from "../dependency-graph/dependency-graph.module.code.ts"

export type Match = {
  readonly at: readonly number[]
}

export type ShapePredicate = (sentence: DepSentence) => readonly Match[]

const SLOT_FAMILIES = ["nsubj", "obj", "iobj", "obl", "conj", "appos"]
const SLOTS = ["nmod", "root"]
const RELATIVE = ["which", "who", "whom", "whose"]
const DEMONSTRATIVE = ["this", "that", "these", "those"]
const SUMMING = ["both", "each", "either", "neither"]
const QUANTIFIER = [
  "all",
  "any",
  "both",
  "each",
  "either",
  "enough",
  "few",
  "fewer",
  "less",
  "many",
  "more",
  "most",
  "much",
  "neither",
  "none",
  "one",
  "other",
  "others",
  "several",
  "some",
]

export function fillsNounSlot(token: DepToken): boolean {
  if (SLOTS.includes(token.deprel)) return true
  return SLOT_FAMILIES.some((slot) => token.deprel === slot || token.deprel.startsWith(`${slot}:`))
}

export function isRelative(sentence: DepSentence, token: DepToken): boolean {
  const said = lower(token)
  if (RELATIVE.includes(said)) return true
  if (said !== "that") return false
  return byId(sentence, token.head)?.deprel.startsWith("acl") ?? false
}

export function isDemonstrative(token: DepToken): boolean {
  return DEMONSTRATIVE.includes(lower(token))
}

export function isSummingCount(token: DepToken): boolean {
  return SUMMING.includes(lower(token))
}

export function isQuantifier(token: DepToken): boolean {
  return QUANTIFIER.includes(lower(token))
}

export function partsOf(sentence: DepSentence, token: DepToken): DepToken[] {
  return childrenByRel(sentence, token.id, "nmod").filter((one) =>
    childrenByRel(sentence, one.id, "case").some((mark) => lower(mark) === "of")
  )
}

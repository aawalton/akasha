import type { DepSentence, DepToken } from "../dependency-graph/dependency-graph.module.code.ts"
import {
  byId,
  childrenByRel,
  childrenOf,
  lower,
} from "../dependency-graph/dependency-graph.module.code.ts"

export type Match = {
  readonly at: readonly number[]
}

export type ShapePredicate = (sentence: DepSentence) => readonly Match[]

const SLOT_FAMILIES = ["nsubj", "obj", "iobj", "obl", "conj", "appos"]
const SLOTS = ["nmod", "root"]
const RELATIVE = ["which", "who", "whom", "whose"]
const DEMONSTRATIVE = ["this", "that", "these", "those"]
const SUMMING = ["both", "each", "either", "neither"]
const DEGREE = ["all", "least", "most"]
const MARKERS = ["advmod", "case", "cc", "det", "fixed", "punct"]
const OPENERS = ["SCONJ", "CCONJ"]
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

function wordBefore(sentence: DepSentence, token: DepToken): DepToken | undefined {
  for (let at = token.id - 1; at >= 1; at -= 1) {
    const one = byId(sentence, at)
    if (one !== undefined && one.upos !== "PUNCT") return one
  }
  return undefined
}

export function isRelative(sentence: DepSentence, token: DepToken): boolean {
  const said = lower(token)
  if (RELATIVE.includes(said)) return true
  if (said !== "that") return false
  const before = wordBefore(sentence, token)
  if (before === undefined) return false
  return !OPENERS.includes(before.upos)
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

export function marksADegree(sentence: DepSentence, token: DepToken): boolean {
  if (!DEGREE.includes(lower(token))) return false
  if (!childrenByRel(sentence, token.id, "case").some((one) => lower(one) === "at")) return false
  return childrenOf(sentence, token.id).every((one) => MARKERS.includes(one.deprel))
}

export function partsOf(sentence: DepSentence, token: DepToken): DepToken[] {
  return childrenByRel(sentence, token.id, "nmod").filter((one) =>
    childrenByRel(sentence, one.id, "case").some((mark) => lower(mark) === "of")
  )
}

import type { DepSentence, DepToken } from "@akasha/plain-language/dependency-graph"
import { childrenByRel, lower } from "@akasha/plain-language/dependency-graph"
import type { Match, ShapePredicate } from "@akasha/plain-language/shape-predicate"
import { fillsNounSlot, isQuantifier, partsOf } from "@akasha/plain-language/shape-predicate"

function marksBy(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, "case").some((one) => lower(one) === "by")
}

function oneByOne(sentence: DepSentence, token: DepToken): boolean {
  if (lower(token) !== "one") return false
  return sentence.tokens.some((other) => {
    if (other.id === token.id) return false
    if (lower(other) !== "one") return false
    if (other.head !== token.id && token.head !== other.id) return false
    return marksBy(sentence, other) || marksBy(sentence, token)
  })
}

export const loneQuantifier: ShapePredicate = (sentence) => {
  const found: Match[] = []
  for (const token of sentence.tokens) {
    if (!isQuantifier(token)) continue
    if (!fillsNounSlot(token)) continue
    if (partsOf(sentence, token).length > 0) continue
    if (oneByOne(sentence, token)) continue
    found.push({ at: [token.id] })
  }
  return found
}

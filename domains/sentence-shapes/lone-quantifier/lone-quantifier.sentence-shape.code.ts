import type {
  DepSentence,
  DepToken,
} from "akasha/domains/plain-language/dependency-graph/dependency-graph.module.code.ts"
import {
  childrenByRel,
  lower,
} from "akasha/domains/plain-language/dependency-graph/dependency-graph.module.code.ts"
import type {
  Match,
  ShapePredicate,
} from "akasha/domains/plain-language/shape-predicate/shape-predicate.module.code.ts"
import {
  determinesABacktickedName,
  fillsNounSlot,
  headsAComparative,
  isBackticked,
  isQuantifier,
  isReciprocal,
  marksADegree,
  partsOf,
} from "akasha/domains/plain-language/shape-predicate/shape-predicate.module.code.ts"

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
    if (isBackticked(sentence, token)) continue
    if (determinesABacktickedName(sentence, token)) continue
    if (isReciprocal(sentence, token)) continue
    if (headsAComparative(sentence, token)) continue
    if (!fillsNounSlot(token)) continue
    if (partsOf(sentence, token).length > 0) continue
    if (marksADegree(sentence, token)) continue
    if (oneByOne(sentence, token)) continue
    found.push({ at: [token.id] })
  }
  return found
}

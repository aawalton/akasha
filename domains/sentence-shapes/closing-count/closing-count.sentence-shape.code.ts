import type { DepSentence, DepToken } from "@akasha/plain-language/dependency-graph"
import { childrenOf, lower } from "@akasha/plain-language/dependency-graph"
import type { Match, ShapePredicate } from "@akasha/plain-language/shape-predicate"
import { isSummingCount } from "@akasha/plain-language/shape-predicate"

const MARKERS = ["case", "cc", "advmod", "det", "punct"]

function closesSentence(sentence: DepSentence, token: DepToken): boolean {
  return sentence.tokens.every((one) => one.id <= token.id || one.upos === "PUNCT")
}

function carriesANoun(sentence: DepSentence, token: DepToken): boolean {
  return childrenOf(sentence, token.id).some((one) => !MARKERS.includes(one.deprel))
}

function saysAlso(token: DepToken): boolean {
  return lower(token) === "either" && token.deprel === "advmod"
}

export const closingCount: ShapePredicate = (sentence) => {
  const found: Match[] = []
  for (const token of sentence.tokens) {
    if (!isSummingCount(token)) continue
    if (!closesSentence(sentence, token)) continue
    if (carriesANoun(sentence, token)) continue
    if (saysAlso(token)) continue
    found.push({ at: [token.id] })
  }
  return found
}

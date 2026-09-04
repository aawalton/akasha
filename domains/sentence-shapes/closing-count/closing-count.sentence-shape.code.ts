import type { DepSentence, DepToken } from "@akasha/plain-language/dependency-graph"
import type { Match, ShapePredicate } from "@akasha/plain-language/shape-predicate"
import { isSummingCount } from "@akasha/plain-language/shape-predicate"

function closesSentence(sentence: DepSentence, token: DepToken): boolean {
  return sentence.tokens.every((one) => one.id <= token.id || one.upos === "PUNCT")
}

function listedBefore(sentence: DepSentence, token: DepToken): DepToken[] {
  return sentence.tokens.filter(
    (one) => one.id < token.id && (one.deprel === "conj" || one.deprel.startsWith("conj:"))
  )
}

export const closingCount: ShapePredicate = (sentence) => {
  const found: Match[] = []
  for (const token of sentence.tokens) {
    if (!isSummingCount(token)) continue
    if (!closesSentence(sentence, token)) continue
    const listed = listedBefore(sentence, token)
    if (listed.length === 0) continue
    found.push({ at: [...listed.map((one) => one.id), token.id] })
  }
  return found
}

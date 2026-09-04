import type { Match, ShapePredicate } from "@akasha/plain-language/shape-predicate"
import { fillsNounSlot, isRelative } from "@akasha/plain-language/shape-predicate"

export const lonePronoun: ShapePredicate = (sentence) => {
  const found: Match[] = []
  for (const token of sentence.tokens) {
    if (token.upos !== "PRON") continue
    if (!fillsNounSlot(token)) continue
    if (isRelative(sentence, token)) continue
    found.push({ at: [token.id] })
  }
  return found
}

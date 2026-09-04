import type { Match, ShapePredicate } from "@akasha/plain-language/shape-predicate"
import { fillsNounSlot, isDemonstrative, isRelative } from "@akasha/plain-language/shape-predicate"

export const loneDeterminer: ShapePredicate = (sentence) => {
  const found: Match[] = []
  for (const token of sentence.tokens) {
    if (!isDemonstrative(token)) continue
    if (!fillsNounSlot(token)) continue
    if (isRelative(sentence, token)) continue
    found.push({ at: [token.id] })
  }
  return found
}

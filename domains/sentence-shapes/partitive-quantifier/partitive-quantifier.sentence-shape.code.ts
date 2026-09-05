import type { Match, ShapePredicate } from "@akasha/plain-language/shape-predicate"
import {
  countsItsParts,
  fillsNounSlot,
  isQuantifier,
  marksAProportion,
  partsOf,
} from "@akasha/plain-language/shape-predicate"

export const partitiveQuantifier: ShapePredicate = (sentence) => {
  const found: Match[] = []
  for (const token of sentence.tokens) {
    if (!isQuantifier(token)) continue
    if (!fillsNounSlot(token)) continue
    if (marksAProportion(sentence, token)) continue
    if (countsItsParts(sentence, token)) continue
    for (const part of partsOf(sentence, token)) {
      found.push({ at: [token.id, part.id] })
    }
  }
  return found
}

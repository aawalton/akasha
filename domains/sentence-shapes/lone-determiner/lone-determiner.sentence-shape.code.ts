import type {
  Match,
  ShapePredicate,
} from "akasha/domains/plain-language/shape-predicate/shape-predicate.module.code.ts"
import {
  fillsNounSlot,
  isDemonstrative,
  isRelative,
} from "akasha/domains/plain-language/shape-predicate/shape-predicate.module.code.ts"

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

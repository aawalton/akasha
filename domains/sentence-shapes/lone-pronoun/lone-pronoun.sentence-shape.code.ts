import type {
  Match,
  ShapePredicate,
} from "akasha/domains/plain-language/shape-predicate/shape-predicate.module.code.ts"
import {
  fillsNounSlot,
  fillsNounSlotAsFreeRelative,
  isDemonstrative,
  isFreeChoice,
  isFreeRelative,
  isIndefinite,
  isPronoun,
  isQuantifier,
  isReflexive,
  isRelative,
} from "akasha/domains/plain-language/shape-predicate/shape-predicate.module.code.ts"

export const lonePronoun: ShapePredicate = (sentence) => {
  const found: Match[] = []
  for (const token of sentence.tokens) {
    if (!isFreeRelative(token) && token.upos !== "PRON") continue
    if (!isPronoun(token)) continue
    if (!fillsNounSlot(token) && !fillsNounSlotAsFreeRelative(sentence, token)) continue
    if (isRelative(sentence, token)) continue
    if (isDemonstrative(token)) continue
    if (isQuantifier(token)) continue
    if (isIndefinite(token)) continue
    if (isFreeChoice(token)) continue
    if (isReflexive(token)) continue
    found.push({ at: [token.id] })
  }
  return found
}

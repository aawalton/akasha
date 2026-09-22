import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const strengthOfTheAutomaton = {
  id: "019e66e6-a0cd-729a-8fda-cd82ea656329",
  type: "page-type/temper-set",
  slug: "strength-of-the-automaton",
  title: "Strength of the Automaton",
  key: "strength-of-the-automaton",
  esoSetId: 301,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

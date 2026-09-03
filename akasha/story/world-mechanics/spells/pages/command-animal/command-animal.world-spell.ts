import type { WorldSpell } from "../../world-spell.page-type.ts"

export const commandAnimal = {
  id: "01a06572-95b9-7b59-9536-de976c186144",
  pageTypeSlug: "world-spell",
  slug: "command-animal",
  title: "Command Animal",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

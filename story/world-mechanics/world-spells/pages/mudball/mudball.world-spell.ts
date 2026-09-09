import type { WorldSpell } from "../../world-spell.page-type.ts"

export const mudball = {
  id: "01a06572-95d9-75a3-a797-e98fd8681c92",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mudball",
  title: "Mudball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "../../world-spell.page-type.ts"

export const createManaDeath = {
  id: "01a06572-95bb-7367-af6b-2920918b8efe",
  pageTypeSlug: "world-spell",
  slug: "create-mana-death",
  title: "Create Mana: Death",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

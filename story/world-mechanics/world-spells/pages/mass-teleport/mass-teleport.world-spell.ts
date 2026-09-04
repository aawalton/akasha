import type { WorldSpell } from "../../world-spell.page-type.ts"

export const massTeleport = {
  id: "01a06572-95d2-7acd-84ce-2ffa730aed7b",
  pageTypeSlug: "world-spell",
  slug: "mass-teleport",
  title: "Mass Teleport",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

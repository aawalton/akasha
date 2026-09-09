import type { WorldSpell } from "../../world-spell.page-type.ts"

export const sandAvalanche = {
  id: "01a06572-95de-7642-be24-f2acaec9d0a0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sand-avalanche",
  title: "Sand Avalanche",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "../../world-spell.page-type.ts"

export const echo = {
  id: "01a06572-95bf-7b4f-b714-37959d520cac",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "echo",
  title: "Echo",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

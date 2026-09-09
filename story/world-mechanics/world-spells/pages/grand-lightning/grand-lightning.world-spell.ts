import type { WorldSpell } from "../../world-spell.page-type.ts"

export const grandLightning = {
  id: "01a06572-95c6-773f-af9f-932aa01e0d69",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "grand-lightning",
  title: "Grand Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

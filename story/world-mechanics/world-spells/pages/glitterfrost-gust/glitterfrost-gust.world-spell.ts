import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const glitterfrostGust = {
  id: "01a06572-95c6-7e6a-846e-dc09c32a1321",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "glitterfrost-gust",
  title: "Glitterfrost Gust",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

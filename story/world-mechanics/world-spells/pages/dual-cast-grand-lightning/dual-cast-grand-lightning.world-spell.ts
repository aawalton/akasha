import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dualCastGrandLightning = {
  id: "01a06572-95be-7973-825f-b625b48f2bcc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dual-cast-grand-lightning",
  title: "Dual Cast: Grand Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

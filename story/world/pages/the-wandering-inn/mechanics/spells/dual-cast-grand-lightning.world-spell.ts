import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dualCastGrandLightning = {
  id: "01a06572-95be-7973-825f-b625b48f2bcc",
  type: "page-type/world-spell",
  slug: "dual-cast-grand-lightning",
  title: "Dual Cast: Grand Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

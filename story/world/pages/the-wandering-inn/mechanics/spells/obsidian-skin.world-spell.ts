import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const obsidianSkin = {
  id: "01a06572-95da-7e6a-8022-9198a0953080",
  type: "page-type/world-spell",
  slug: "obsidian-skin",
  title: "Obsidian Skin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const obsidianSkin = {
  id: "01a06572-95da-7e6a-8022-9198a0953080",
  type: "world-spell",
  slug: "obsidian-skin",
  title: "Obsidian Skin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

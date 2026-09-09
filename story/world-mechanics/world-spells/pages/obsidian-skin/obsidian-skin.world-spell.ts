import type { WorldSpell } from "../../world-spell.page-type.ts"

export const obsidianSkin = {
  id: "01a06572-95da-7e6a-8022-9198a0953080",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "obsidian-skin",
  title: "Obsidian Skin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

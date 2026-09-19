import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hammerOfTheObsidianGiant = {
  id: "01a06572-95c8-77f5-8540-05d09923cc73",
  type: "page-type/world-spell",
  slug: "hammer-of-the-obsidian-giant",
  title: "Hammer of the Obsidian Giant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

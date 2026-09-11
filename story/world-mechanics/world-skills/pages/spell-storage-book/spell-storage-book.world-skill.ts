import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const spellStorageBook = {
  id: "01a0657d-02ed-7263-ba84-ffd247a03745",
  type: "world-skill",
  slug: "spell-storage-book",
  title: "Spell Storage: Book",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const phantomSwordSlash = {
  id: "01a0657d-0290-7ba5-ab98-483cc7e7ab55",
  type: "page-type/world-skill",
  slug: "phantom-sword-slash",
  title: "Phantom Sword Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

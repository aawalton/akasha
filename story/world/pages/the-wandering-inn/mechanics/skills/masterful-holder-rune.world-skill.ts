import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const masterfulHolderRune = {
  id: "01a0657d-024c-75ef-a12f-ca3cfe9b1eb8",
  type: "page-type/world-skill",
  slug: "masterful-holder-rune",
  title: "Masterful Holder Rune",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

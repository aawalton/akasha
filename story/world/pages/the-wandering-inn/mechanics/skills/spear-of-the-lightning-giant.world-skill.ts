import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearOfTheLightningGiant = {
  id: "01a0657d-02ed-7971-b865-fb6bd5204830",
  type: "page-type/world-skill",
  slug: "spear-of-the-lightning-giant",
  title: "Spear of the Lightning Giant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

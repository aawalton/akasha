import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stomachOfTheHermit = {
  id: "01a0657d-02fa-74c1-8113-10be52ff51c8",
  type: "page-type/world-skill",
  slug: "stomach-of-the-hermit",
  title: "Stomach of the Hermit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

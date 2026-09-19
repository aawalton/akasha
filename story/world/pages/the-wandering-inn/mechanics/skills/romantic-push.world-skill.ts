import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const romanticPush = {
  id: "01a0657d-02b6-7f4e-a946-e522e88de12b",
  type: "page-type/world-skill",
  slug: "romantic-push",
  title: "Romantic Push",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

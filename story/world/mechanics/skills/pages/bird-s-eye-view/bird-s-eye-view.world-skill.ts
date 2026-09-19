import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const birdSEyeView = {
  id: "01a06575-97f5-72fe-a245-573dea993303",
  type: "page-type/world-skill",
  slug: "bird-s-eye-view",
  title: "Bird’s Eye View",
  world: "world/the-wandering-inn",
  aliases: ["Bird’s-Eye View"],
  references: "jsonl",
} as const satisfies WorldSkill

import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const birdSEyeView = {
  id: "01a06575-97f5-72fe-a245-573dea993303",
  type: "page-type/world-skill",
  slug: "bird-s-eye-view",
  title: "Bird’s Eye View",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  aliases: ["Bird’s-Eye View"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.565Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill

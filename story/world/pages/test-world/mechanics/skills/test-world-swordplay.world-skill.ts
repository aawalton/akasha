import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const testWorldSwordplay = {
  id: "01a17ec5-a3e5-7c74-910c-b9c92d1b314f",
  type: "page-type/world-skill",
  slug: "test-world-swordplay",
  title: "Swordplay",
  world: "world/test-world",
  description: "Skill with the sword: cut, thrust and guard.",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldSkill

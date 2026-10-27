import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const testWorldSpark = {
  id: "01a17ec5-a3e5-74c1-a302-1bc65ddb8a9e",
  type: "page-type/world-skill",
  slug: "test-world-spark",
  title: "Spark",
  world: "world/test-world",
  description: "A small flash of light and heat from the fingertips.",
  manaCost: 1,
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldSkill

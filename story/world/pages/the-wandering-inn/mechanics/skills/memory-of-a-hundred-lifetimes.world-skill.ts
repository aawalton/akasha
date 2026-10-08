import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const memoryOfAHundredLifetimes = {
  id: "01a0657d-024c-75bd-962b-69412b9244a6",
  type: "page-type/world-skill",
  slug: "memory-of-a-hundred-lifetimes",
  title: "Memory of a Hundred Lifetimes",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-skill/memory-of-a-thousand-lifetimes"],
  createdAt: "2026-09-03T04:18:06.540Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill

import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theActorSShadow = {
  id: "01a0657d-0311-7f87-9a1f-b2ff49d78175",
  type: "page-type/world-skill",
  slug: "the-actor-s-shadow",
  title: "The Actor’s Shadow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

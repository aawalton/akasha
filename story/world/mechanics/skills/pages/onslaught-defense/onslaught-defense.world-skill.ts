import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const onslaughtDefense = {
  id: "01a0657d-027c-7356-8c13-5436330e2442",
  type: "page-type/world-skill",
  slug: "onslaught-defense",
  title: "Onslaught Defense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

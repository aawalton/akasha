import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const childOfManyWorlds = {
  id: "01a06575-97fb-7b5c-bebd-14f2338068be",
  type: "page-type/world-skill",
  slug: "child-of-many-worlds",
  title: "Child of Many Worlds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

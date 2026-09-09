import type { WorldSkill } from "../../world-skill.page-type.ts"

export const childOfManyWorlds = {
  id: "01a06575-97fb-7b5c-bebd-14f2338068be",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "child-of-many-worlds",
  title: "Child of Many Worlds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

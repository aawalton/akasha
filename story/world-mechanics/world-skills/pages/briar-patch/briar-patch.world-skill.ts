import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const briarPatch = {
  id: "01a06575-97f9-77e7-a95a-0c9e483794fb",
  type: "world-skill",
  slug: "briar-patch",
  title: "Briar Patch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

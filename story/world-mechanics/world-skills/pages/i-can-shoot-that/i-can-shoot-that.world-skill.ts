import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const iCanShootThat = {
  id: "01a06575-981b-77d9-88f3-5a18699db925",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "i-can-shoot-that",
  title: "I Can Shoot That",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

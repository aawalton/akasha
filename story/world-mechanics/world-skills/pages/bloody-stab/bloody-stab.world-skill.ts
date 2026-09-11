import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bloodyStab = {
  id: "01a06575-97f6-7773-bedb-d128eb2ceac2",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "bloody-stab",
  title: "Bloody Stab",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

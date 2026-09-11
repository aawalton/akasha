import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const swashbucklingCombat = {
  id: "01a0657d-0303-7fea-b48f-be2fe920d760",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "swashbuckling-combat",
  title: "Swashbuckling Combat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

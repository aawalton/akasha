import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const interceptMortalBlow = {
  id: "01a06575-9820-7fc6-8752-1774e28297c0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "intercept-mortal-blow",
  title: "Intercept Mortal Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

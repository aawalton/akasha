import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dualBlow = {
  id: "01a06575-9806-7add-a340-fb7409b5fa13",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "dual-blow",
  title: "Dual Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

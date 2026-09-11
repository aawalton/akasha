import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const royalTax = {
  id: "01a0657d-02b7-7e99-89fb-5a9c1cc30735",
  type: "world-skill",
  slug: "royal-tax",
  title: "Royal Tax",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

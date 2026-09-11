import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const scavengerArmor = {
  id: "01a0657d-02b8-7c04-a8aa-58fbc3611268",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "scavenger-armor",
  title: "Scavenger Armor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

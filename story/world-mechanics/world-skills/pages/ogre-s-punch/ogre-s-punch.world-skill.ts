import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ogreSPunch = {
  id: "01a0657d-027c-77ad-8e95-3f793a2bfe7b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "ogre-s-punch",
  title: "Ogre’s Punch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

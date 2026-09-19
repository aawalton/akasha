import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const supportCastingIntensifiedMagic = {
  id: "01a0657d-0303-7673-9804-85f2fe62d9ca",
  type: "page-type/world-skill",
  slug: "support-casting-intensified-magic",
  title: "Support Casting: Intensified Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

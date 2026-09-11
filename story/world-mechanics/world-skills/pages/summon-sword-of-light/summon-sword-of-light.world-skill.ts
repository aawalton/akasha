import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const summonSwordOfLight = {
  id: "01a0657d-02ff-7f00-9560-0d532885f9d8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "summon-sword-of-light",
  title: "Summon: Sword of Light",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

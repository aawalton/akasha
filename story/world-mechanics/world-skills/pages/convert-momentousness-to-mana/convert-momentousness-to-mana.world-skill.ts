import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const convertMomentousnessToMana = {
  id: "01a06575-97fd-74ff-8b7a-352c06ff9400",
  type: "world-skill",
  slug: "convert-momentousness-to-mana",
  title: "Convert Momentousness to Mana",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const prayerDreadfulOmen = {
  id: "01a0657d-0296-78e1-9e83-75a743870645",
  type: "world-skill",
  slug: "prayer-dreadful-omen",
  title: "Prayer: Dreadful Omen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

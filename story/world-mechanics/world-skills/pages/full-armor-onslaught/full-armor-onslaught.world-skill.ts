import type { WorldSkill } from "../../world-skill.page-type.ts"

export const fullArmorOnslaught = {
  id: "01a06575-9811-70c6-b635-63125884714f",
  pageTypeSlug: "world-skill",
  slug: "full-armor-onslaught",
  title: "Full Armor Onslaught",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["armored-blow"],
  references: "jsonl",
} as const satisfies WorldSkill

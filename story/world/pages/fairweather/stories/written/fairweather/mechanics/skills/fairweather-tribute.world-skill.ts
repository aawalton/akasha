import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherTribute = {
  id: "01a106e8-584a-7065-a892-413bd1db8b6b",
  type: "page-type/world-skill",
  slug: "fairweather-tribute",
  title: "Tribute",
  world: "world/fairweather",
  description:
    "A passive Enthraller skill, gained at level 5: what is given is given back. Devotion reaches every attribute. For each bond Elsie holds, in each of the four attributes other than the bond's attribute, Elsie and that girl each add half of Devotion's share of the higher of their two bases in that attribute, rounded down. So a bond of 60 with Tilly, whose Grace base is 5 to Elsie's 2, adds 30% of 5, rounded down to 1, to the Grace of each.",
} as const satisfies WorldSkill

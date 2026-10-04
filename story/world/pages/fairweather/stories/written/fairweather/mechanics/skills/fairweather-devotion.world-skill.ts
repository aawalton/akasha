import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherDevotion = {
  id: "01a1021b-0e9d-74c5-b4f4-9c034c3f08ad",
  type: "page-type/world-skill",
  slug: "fairweather-devotion",
  title: "Devotion",
  world: "world/fairweather",
  description:
    "A passive Enthraller skill, gained at level 3: the caster grows stronger by the devotion borne toward her, and the one who bears it grows with her. For each bond Elsie holds, the share is the bond's number as a percentage, at most 100%. Elsie and that girl each add that share of the bond's attribute (fairweather-enthraller-passives), rounded down, to that same attribute. So a bond of 25 with Tamsin, whose Strength base of 21 is the highest of the ten, adds 5 Strength to Elsie and 5 to Tamsin; at 100 it adds 21 to each.",
} as const satisfies WorldSkill

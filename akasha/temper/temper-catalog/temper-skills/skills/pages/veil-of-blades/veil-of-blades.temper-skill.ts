import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const veilOfBlades = {
  id: "019e6245-a760-705f-83ed-85937e8ddbbc",
  pageTypeSlug: "temper-skill",
  slug: "veil-of-blades",
  title: "Veil of Blades",
  key: "veil-of-blades",
  baseName: "Consuming Darkness",
  description:
    '"Conjure a ring of shadow, reducing the Movement Speed of enemies by 70%, dealing 1438 Magic Damage to them every 1 second, and granting you and your allies Major Protection, reducing your damage taken by 10%. \\n\\nAllies in the area can activate the Hidden Refresh synergy, granting them invisibility, increasing their Movement Speed by 70%, and healing them for 9110 Health over 4 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_015_b.dds",
  esoSkillId: 37713,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "ultimate",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const veilOfBlades36485 = {
  id: "019e6f53-a8a7-7f93-b01f-ee29be74e235",
  pageTypeSlug: "temper-skill",
  slug: "veil-of-blades-36485",
  title: "Veil of Blades",
  key: "veil-of-blades-36485",
  baseName: "Consuming Darkness",
  description:
    '"Conjure a ring of shadow, reducing the Movement Speed of enemies by |cffffff70|r%, dealing |cffffff5004|r Magic Damage to them every |cffffff1|r second, and granting you and your allies Major Protection, reducing your damage taken by |cffffff10|r%. \\n\\nAllies in the area can activate the Hidden Refresh synergy, granting them invisibility, increasing their Movement Speed by |cffffff70|r%, and healing them for |cffffff28640|r Health over |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_015_b.dds",
  esoSkillId: 36485,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "ultimate",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill

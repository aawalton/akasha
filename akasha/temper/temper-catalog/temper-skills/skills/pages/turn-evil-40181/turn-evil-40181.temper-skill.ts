import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const turnEvil40181 = {
  id: "019e6f53-a869-73f1-b5b6-1557f3aeeec3",
  pageTypeSlug: "temper-skill",
  slug: "turn-evil-40181",
  title: "Turn Evil",
  key: "turn-evil-40181",
  baseName: "Circle of Protection",
  description:
    '"Brand the earth at your location with a rune of protection for |cffffff20|r seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing your damage taken by |cffffff5|r% and increasing your Stamina Recovery by |cffffff15|r%.\\n\\nUpon activation, enemies in the area are feared for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_001_a.dds",
  esoSkillId: 40181,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill

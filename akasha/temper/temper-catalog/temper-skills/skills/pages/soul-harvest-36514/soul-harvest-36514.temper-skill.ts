import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulHarvest36514 = {
  id: "019e6f53-a764-7f2c-ad85-44f1cda83978",
  pageTypeSlug: "temper-skill",
  slug: "soul-harvest-36514",
  title: "Soul Harvest",
  key: "soul-harvest-36514",
  baseName: "Death Stroke",
  description:
    '"Ravage an enemy with a spinning attack, dealing |cffffff12924|r Magic Damage and increasing your damage against them by |cffffff20|r% for |cffffff8|r seconds.\\n\\nAlso afflicts the enemy with Major Defile, reducing their healing received and damage shield strength by |cffffff12|r%.\\n\\nWhile slotted on either bar, any time you kill an enemy you gain |cffffff10|r Ultimate."',
  icon: "/esoui/art/icons/ability_nightblade_007_b.dds",
  esoSkillId: 36514,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "ultimate",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ambush25484 = {
  id: "019e6f53-9ea7-7772-b484-3afbbf0db4d7",
  pageTypeSlug: "temper-skill",
  slug: "ambush-25484",
  title: "Ambush",
  key: "ambush-25484",
  baseName: "Teleport Strike",
  description:
    '"Flash through the shadows and ambush an enemy, dealing |cffffff5756|r Physical Damage and afflicting them with Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%.\\n\\nAlso grants you Empower and Minor Berserk for |cffffff10|r seconds, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r% and your damage done by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_008_b.dds",
  esoSkillId: 25484,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill

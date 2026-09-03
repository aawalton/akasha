import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const teleportStrike = {
  id: "019e6f53-a824-70b1-adc7-54c9660bb87f",
  pageTypeSlug: "temper-skill",
  slug: "teleport-strike",
  title: "Teleport Strike",
  key: "teleport-strike",
  baseName: "Teleport Strike",
  description:
    '"Flash through the shadows and ambush an enemy, dealing |cffffff5571|r Magic Damage and afflicting them with Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_008.dds",
  esoSkillId: 18342,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill

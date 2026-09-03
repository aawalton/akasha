import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceLowSlash = {
  id: "019e6f53-a936-7345-b7fd-66a82b7cdfb6",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-low-slash",
  title: "Vengeance Low Slash",
  key: "vengeance-low-slash",
  baseName: "Vengeance Low Slash",
  description:
    '"Surprise an enemy with a deep lunge, dealing |cffffff6678|r Physical Damage and afflicting them with Minor Maim, reducing their damage done by |cffffff5|r% for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_001.dds",
  esoSkillId: 240558,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-one-hand-and-shield",
} as const satisfies TemperSkill

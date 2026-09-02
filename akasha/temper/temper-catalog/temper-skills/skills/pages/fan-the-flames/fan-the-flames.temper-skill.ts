import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fanTheFlames = {
  id: "01a05fd0-8e30-7396-ac69-b0966ca7cbfc",
  pageTypeSlug: "temper-skill",
  slug: "fan-the-flames",
  title: "Fan the Flames",
  key: "fan-the-flames",
  baseName: "Fan the Flames",
  description:
    '"Tend to your garden of flame, that it may flourish.\\n\\nIncreases your chances of applying the Burning status effect by |cffffff25|r% and its damage done by |cffffff12|r%. These values are influenced by the number of Dragonknight abilities slotted."',
  icon: "/esoui/art/icons/ability_dragonknight_028.dds",
  esoSkillId: 29439,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "passive",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill

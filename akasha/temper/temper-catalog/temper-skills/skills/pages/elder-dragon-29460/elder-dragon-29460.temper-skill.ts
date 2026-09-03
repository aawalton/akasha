import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elderDragon29460 = {
  id: "019e6f53-a10c-7208-8334-79f279a7d48a",
  pageTypeSlug: "temper-skill",
  slug: "elder-dragon-29460",
  title: "Elder Dragon",
  key: "elder-dragon-29460",
  baseName: "Elder Dragon",
  description:
    '"The eldest Dragons are forces of nature. As are you.\\n\\nActivating a Draconic Power ability grants you and group members Minor Brutality for |cffffff20|r seconds, increasing Weapon Damage by |cffffff10|r%.\\n\\nIncreases your Health Recovery by up to |cffffff350|r, based on your missing Health.\\nCurrent amount: |cffffff0|r"',
  icon: "/esoui/art/icons/ability_dragonknight_025.dds",
  esoSkillId: 29460,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "dragonknight-draconic-power",
  skillType: "passive",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill

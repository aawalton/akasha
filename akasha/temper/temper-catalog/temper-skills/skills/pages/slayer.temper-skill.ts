import type { TemperSkill } from "../temper-skill.page-type.ts"

export const slayer = {
  id: "01a05fd1-7ccb-7470-9e36-92a160ecb25f",
  pageTypeSlug: "temper-skill",
  slug: "slayer",
  title: "Slayer",
  key: "slayer",
  baseName: "Slayer",
  description:
    '"Increases your Weapon and Spell Damage by 3% for each Fighters Guild ability slotted.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_dragonknight_025.dds",
  esoSkillId: 45596,
  isMorph: false,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 3,
  skillLineId: "guild-fighters-guild",
  skillType: "passive",
  subcategoryId: "guild-fighters-guild",
  status: "supported",
} as const satisfies TemperSkill

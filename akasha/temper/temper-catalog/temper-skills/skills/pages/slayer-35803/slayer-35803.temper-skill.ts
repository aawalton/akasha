import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const slayer35803 = {
  id: "019e6f53-a73d-7025-a4ee-2e563bda65f3",
  pageTypeSlug: "temper-skill",
  slug: "slayer-35803",
  title: "Slayer",
  key: "slayer-35803",
  baseName: "Slayer",
  description:
    '"Increases your Weapon and Spell Damage by |cffffff1|r% for each Fighters Guild ability slotted.\\n\\nCurrent bonus: |cffffff0|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_025.dds",
  esoSkillId: 35803,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "guild-fighters-guild",
  skillType: "passive",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill

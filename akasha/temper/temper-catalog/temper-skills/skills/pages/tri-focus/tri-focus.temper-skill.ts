import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const triFocus = {
  id: "01a05fd1-d272-7c9a-a2ed-5b28e691a75c",
  pageTypeSlug: "temper-skill",
  slug: "tri-focus",
  title: "Tri Focus",
  key: "tri-focus",
  baseName: "Tri Focus",
  description:
    '"Fully-charged Inferno Staff Heavy Attacks deal an additional 4480 Flame Damage over 20 seconds.\\n\\nFully-charged Lightning Staff Heavy Attacks damage nearby enemies for 100% of the damage done.\\n\\nFully-charged Ice Staff Heavy Attacks grant you a damage shield that absorbs 5280 damage. This effect scales off your Max Health.\\n\\nWhile an Ice Staff is equipped, blocking costs Magicka instead of Stamina."',
  icon: "/esoui/art/icons/ability_weapon_001.dds",
  esoSkillId: 45500,
  isMorph: false,
  learnedLevel: 34,
  lineRankNeeded: 34,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-destruction-staff",
  skillType: "passive",
  subcategoryId: "weapon-destruction-staff",
  status: "unsupported",
} as const satisfies TemperSkill

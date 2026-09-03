import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceMoltenWeapons = {
  id: "019e6f53-a940-7223-ae00-4f8d3786e66e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-molten-weapons",
  title: "Vengeance Molten Weapons",
  key: "vengeance-molten-weapons",
  baseName: "Vengeance Molten Weapons",
  description:
    '"Charge your and up to 2 of your grouped allies\' weapons with volcanic power to gain Minor Prophecy and Savagery, increasing your Weapon and Spell Critical by |cffffff1314|r for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_015.dds",
  esoSkillId: 237782,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-earthen-heart",
} as const satisfies TemperSkill

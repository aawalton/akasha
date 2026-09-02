import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ruffian = {
  id: "01a05fd1-7c9f-7072-9137-7a990a31618a",
  pageTypeSlug: "temper-skill",
  slug: "ruffian",
  title: "Ruffian",
  key: "ruffian",
  baseName: "Ruffian",
  description:
    '"Gives you a 15% damage bonus when attacking stunned, immobilized, or silenced enemies."',
  icon: "/esoui/art/icons/ability_weapon_014.dds",
  esoSkillId: 45481,
  isMorph: false,
  learnedLevel: 46,
  lineRankNeeded: 46,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
  status: "unsupported",
} as const satisfies TemperSkill

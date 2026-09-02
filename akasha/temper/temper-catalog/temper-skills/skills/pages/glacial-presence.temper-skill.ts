import type { TemperSkill } from "../temper-skill.page-type.ts"

export const glacialPresence = {
  id: "01a05fd0-dc9e-7e54-a64e-22dd5c3c39c1",
  pageTypeSlug: "temper-skill",
  slug: "glacial-presence",
  title: "Glacial Presence",
  key: "glacial-presence",
  baseName: "Glacial Presence",
  description:
    '"Increases your chance to apply the Chilled status effect by 250% and increases its damage by 105. The damage increasing effect scales off the higher of your Weapon or Spell Damage."',
  icon: "/esoui/art/icons/passive_warden_002.dds",
  esoSkillId: 86192,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-winters-embrace",
  skillType: "passive",
  subcategoryId: "warden-winters-embrace",
  status: "unsupported",
} as const satisfies TemperSkill

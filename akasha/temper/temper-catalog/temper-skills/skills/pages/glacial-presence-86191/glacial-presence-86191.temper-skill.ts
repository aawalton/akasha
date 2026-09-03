import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const glacialPresence86191 = {
  id: "019e6f53-a28d-7b19-8b36-3477350036d0",
  pageTypeSlug: "temper-skill",
  slug: "glacial-presence-86191",
  title: "Glacial Presence",
  key: "glacial-presence-86191",
  baseName: "Glacial Presence",
  description:
    '"Increases your chance to apply the Chilled status effect by |cffffff125|r% and increases its damage done by |cffffff209|r. The damage increasing effect scales off the higher of your Weapon or Spell Damage."',
  icon: "/esoui/art/icons/passive_warden_002.dds",
  esoSkillId: 86191,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "warden-winters-embrace",
  skillType: "passive",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill

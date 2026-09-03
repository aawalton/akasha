import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFrostCloak = {
  id: "019e6f53-a915-7079-b00f-06b0c44b2551",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-frost-cloak",
  title: "Vengeance Frost Cloak",
  key: "vengeance-frost-cloak",
  baseName: "Vengeance Frost Cloak",
  description:
    '"Wrap a thick cloak of ice around yourself and up to 2 grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_warden_001.dds",
  esoSkillId: 238076,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-winters-embrace",
  skillType: "active",
  subcategoryId: "vengeance-warden-winters-embrace",
} as const satisfies TemperSkill

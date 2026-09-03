import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const iceFortress = {
  id: "019e6245-a6aa-73a2-b2e9-5d96f3a6ace8",
  pageTypeSlug: "temper-skill",
  slug: "ice-fortress",
  title: "Ice Fortress",
  key: "ice-fortress",
  baseName: "Frost Cloak",
  description:
    '"Wrap a thick cloak of ice around you and your grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by 5948 for 30 seconds.\\n\\nYou gain Minor Protection, reducing your damage taken by 5% for 30 seconds."',
  icon: "/esoui/art/icons/ability_warden_001_b.dds",
  esoSkillId: 86133,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill

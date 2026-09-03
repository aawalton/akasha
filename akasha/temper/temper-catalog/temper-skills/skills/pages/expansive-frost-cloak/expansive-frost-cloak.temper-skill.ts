import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const expansiveFrostCloak = {
  id: "019e6245-a679-701f-b122-da4f8b4164ef",
  pageTypeSlug: "temper-skill",
  slug: "expansive-frost-cloak",
  title: "Expansive Frost Cloak",
  key: "expansive-frost-cloak",
  baseName: "Frost Cloak",
  description:
    '"Wrap a thick cloak of ice around you and your grouped allies. The ice grants Major Resolve, increasing your Physical and Spell Resistance by 5948 for 20 seconds."',
  icon: "/esoui/art/icons/ability_warden_001_a.dds",
  esoSkillId: 86129,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceImpalingShards = {
  id: "01a05fd1-d2ac-7978-a7fc-0c5a36fb6e4e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-impaling-shards",
  title: "Vengeance Impaling Shards",
  key: "vengeance-impaling-shards",
  baseName: "Vengeance Impaling Shards",
  description:
    '"Conjure icy shards around you to skewer up to 3 enemies in the area, dealing |cffffff8820|r Frost Damage and immobilizing them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_warden_004.dds",
  esoSkillId: 238079,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-winters-embrace",
  skillType: "active",
  subcategoryId: "vengeance-warden-winters-embrace",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const grippingShards = {
  id: "019e6245-a698-7c99-bc55-fbebf7db1e14",
  pageTypeSlug: "temper-skill",
  slug: "gripping-shards",
  title: "Gripping Shards",
  key: "gripping-shards",
  baseName: "Impaling Shards",
  description:
    '"Conjure icy shards around you to skewer enemies in the area, immobilizing them for 3 seconds and dealing 419 Frost Damage every 1 second for 12 seconds.\\n\\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by 30% for 3 seconds.\\n\\nDamage done is based on your Max Health and has a higher chance to apply the Chilled status effect."',
  icon: "/esoui/art/icons/ability_warden_004_a.dds",
  esoSkillId: 86168,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill

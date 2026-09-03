import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const skeletalArcanist118726 = {
  id: "019e6f53-a72f-74c0-a244-f718dd4a26e4",
  pageTypeSlug: "temper-skill",
  slug: "skeletal-arcanist-118726",
  title: "Skeletal Arcanist",
  key: "skeletal-arcanist-118726",
  baseName: "Skeletal Mage",
  description:
    '"Unearth a skeletal mage from the dirt to fight by your side for |cffffff20|r seconds, while granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%. The mage attacks the closest enemy every |cffffff2|r seconds, dealing |cffffff1667|r Shock Damage to them and all other enemies nearby.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_003_b.dds",
  esoSkillId: 118726,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill

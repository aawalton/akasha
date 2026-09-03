import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const skeletalMage = {
  id: "019e6f53-a734-7216-a7e3-35655c807e53",
  pageTypeSlug: "temper-skill",
  slug: "skeletal-mage",
  title: "Skeletal Mage",
  key: "skeletal-mage",
  baseName: "Skeletal Mage",
  description:
    '"Unearth a skeletal mage from the dirt to fight by your side for |cffffff20|r seconds, while granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%. The mage attacks the closest enemy every |cffffff2|r seconds, dealing |cffffff1613|r Shock Damage.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_003.dds",
  esoSkillId: 114317,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const skeletalArcher118680 = {
  id: "019e6f53-a732-7c67-a379-9c7d3fe84441",
  pageTypeSlug: "temper-skill",
  slug: "skeletal-archer-118680",
  title: "Skeletal Archer",
  key: "skeletal-archer-118680",
  baseName: "Skeletal Mage",
  description:
    '"Unearth a skeletal archer from the dirt to fight by your side for |cffffff20|r seconds, while granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%. The archer attacks the closest enemy every |cffffff2|r seconds, dealing |cffffff1614|r Physical Damage.\\n\\nEach time the archer deals damage, it deals |cffffff15|r% more damage than the previous attack.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_003_a.dds",
  esoSkillId: 118680,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill

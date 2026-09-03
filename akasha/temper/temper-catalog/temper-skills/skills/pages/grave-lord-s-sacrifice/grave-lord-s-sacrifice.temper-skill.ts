import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const graveLordSSacrifice = {
  id: "019e6f53-a2a0-718e-b9c9-975ad20f764f",
  pageTypeSlug: "temper-skill",
  slug: "grave-lord-s-sacrifice",
  title: "Grave Lord's Sacrifice",
  key: "grave-lord-s-sacrifice",
  baseName: "Sacrificial Bones",
  description:
    '"Summon a skeleton from the ground after |cffffff2.5|r seconds. The skeleton leaps to you, sacrificing the fallen soul within and mastering your necromantic energies for |cffffff20|r seconds, increasing your damage done with Necromancer abilities and damage over time effects by |cffffff15|r%. While active, your third cast of Flame Skull damages in an |cffffff6|r meter area.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_002_b.dds",
  esoSkillId: 117749,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill

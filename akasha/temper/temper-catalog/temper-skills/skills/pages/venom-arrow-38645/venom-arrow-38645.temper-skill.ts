import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const venomArrow38645 = {
  id: "019e6f53-a9b9-7878-80dd-8190f376421f",
  pageTypeSlug: "temper-skill",
  slug: "venom-arrow-38645",
  title: "Venom Arrow",
  key: "venom-arrow-38645",
  baseName: "Poison Arrow",
  description:
    '"Shoot an arrow coated in Shadowscale poison at an enemy, dealing |cffffff4038|r Poison Damage and an additional |cffffff11420|r Poison Damage over |cffffff20|r seconds.\\n\\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds.\\n\\nAfter casting you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_bow_002_a.dds",
  esoSkillId: 38645,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 38,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill

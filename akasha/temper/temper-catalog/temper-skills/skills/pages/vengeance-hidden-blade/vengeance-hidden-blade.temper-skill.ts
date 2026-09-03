import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceHiddenBlade = {
  id: "019e6f53-a926-72ac-82c9-bc870e423e84",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-hidden-blade",
  title: "Vengeance Hidden Blade",
  key: "vengeance-hidden-blade",
  baseName: "Vengeance Hidden Blade",
  description:
    '"Fire a secret dagger from your sleeve at an enemy, dealing |cffffff10017|r Physical Damage.\\n\\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_dualwield_003.dds",
  esoSkillId: 241234,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-dual-wield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-dual-wield",
} as const satisfies TemperSkill

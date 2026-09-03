import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const flyingBlade = {
  id: "019e6226-00f1-722b-90d7-437375725da0",
  pageTypeSlug: "temper-skill",
  slug: "flying-blade",
  title: "Flying Blade",
  key: "flying-blade",
  baseName: "Hidden Blade",
  description:
    '"Fire a secret dagger from your sleeve at an enemy, dealing 1438 Physical Damage and marking them for 5 seconds.\\n\\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for 3 seconds.\\n\\nReactivating this ability on them allows you to jump to a marked enemy free of cost, dealing 2160 Physical Damage.\\n\\nCasting grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 40 seconds."',
  icon: "/esoui/art/icons/ability_dualwield_003_a.dds",
  esoSkillId: 40628,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

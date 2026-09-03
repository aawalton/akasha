import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const flyingBlade38910 = {
  id: "019e6f53-a21b-79a8-b715-ec64448d72f7",
  pageTypeSlug: "temper-skill",
  slug: "flying-blade-38910",
  title: "Flying Blade",
  key: "flying-blade-38910",
  baseName: "Hidden Blade",
  description:
    '"Fire a secret dagger from your sleeve at an enemy, dealing |cffffff5004|r Physical Damage and marking them for |cffffff5|r seconds.\\n\\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds.\\n\\nReactivating this ability on them allows you to jump to a marked enemy free of cost, dealing |cffffff7509|r Physical Damage.\\n\\nCasting grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff40|r seconds."',
  icon: "/esoui/art/icons/ability_dualwield_003_a.dds",
  esoSkillId: 38910,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

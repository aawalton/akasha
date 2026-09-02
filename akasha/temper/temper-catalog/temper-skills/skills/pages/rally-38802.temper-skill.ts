import type { TemperSkill } from "../temper-skill.page-type.ts"

export const rally38802 = {
  id: "01a05fd1-2e28-7a2c-9ece-dc5214e89908",
  pageTypeSlug: "temper-skill",
  slug: "rally-38802",
  title: "Rally",
  key: "rally-38802",
  baseName: "Momentum",
  description:
    '"Focus your strength and resolve to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%, as well as gaining Minor Endurance, increasing your Stamina Recovery by |cffffff15|r% for |cffffff30|r seconds.\\n\\nYou heal for |cffffff5660|r Health when Rally ends. The final heal is increased by |cffffff20|r% every |cffffff2|r seconds, up to a maximum of |cffffff200|r%."',
  icon: "/esoui/art/icons/ability_2handed_005_b.dds",
  esoSkillId: 38802,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill

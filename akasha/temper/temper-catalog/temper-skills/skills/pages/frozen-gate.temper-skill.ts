import type { TemperSkill } from "../temper-skill.page-type.ts"

export const frozenGate = {
  id: "01a05fd0-dc98-7d0b-95fe-8eb30d29da69",
  pageTypeSlug: "temper-skill",
  slug: "frozen-gate",
  title: "Frozen Gate",
  key: "frozen-gate",
  baseName: "Frozen Gate",
  description:
    '"Summon an ancient portal, which arms after |cffffff1.5|r seconds and lasts for |cffffff15|r seconds.\\n\\nWhen triggered the enemy is teleported to you if within range, immobilized for |cffffff3|r seconds, and dealt |cffffff6057|r Frost Damage.\\n\\nYou can have up to |cffffff3|r Frozen Gates active at a time."',
  icon: "/esoui/art/icons/ability_warden_005.dds",
  esoSkillId: 86175,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill

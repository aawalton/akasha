import type { TemperSkill } from "../temper-skill.page-type.ts"

export const deadlyCloak38906 = {
  id: "01a05fd0-8e00-761a-b6ab-2cb47faa6a45",
  pageTypeSlug: "temper-skill",
  slug: "deadly-cloak-38906",
  title: "Deadly Cloak",
  key: "deadly-cloak-38906",
  baseName: "Blade Cloak",
  description:
    '"Envelop yourself in a protective cloak of razors, gaining Major Evasion for |cffffff20|r seconds, reducing damage from area attacks by |cffffff20|r%. \\n\\nEvery |cffffff2|r seconds the shrapnel will pulse, dealing |cffffff1971|r Physical Damage to all enemies within |cffffff5|r meters."',
  icon: "/esoui/art/icons/ability_dualwield_004_b.dds",
  esoSkillId: 38906,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

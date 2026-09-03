import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const quickCloak = {
  id: "019e6226-0105-7985-a6c9-27273030d371",
  pageTypeSlug: "temper-skill",
  slug: "quick-cloak",
  title: "Quick Cloak",
  key: "quick-cloak",
  baseName: "Blade Cloak",
  description:
    '"Envelop yourself in a protective cloak of razors, gaining Major Evasion for 30 seconds, reducing damage from area attacks by 20%. \\n\\nEvery 2 seconds the shrapnel will pulse, dealing 422 Physical Damage to all enemies within 5 meters.\\n\\nYou also gain Major Expedition for 4 seconds, increasing your Movement Speed by 30%."',
  icon: "/esoui/art/icons/ability_dualwield_004_a.dds",
  esoSkillId: 40642,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

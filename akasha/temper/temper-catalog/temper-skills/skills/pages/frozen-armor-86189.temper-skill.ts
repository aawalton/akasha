import type { TemperSkill } from "../temper-skill.page-type.ts"

export const frozenArmor86189 = {
  id: "01a05fd0-dc96-781c-a458-ef9a011c005c",
  pageTypeSlug: "temper-skill",
  slug: "frozen-armor-86189",
  title: "Frozen Armor",
  key: "frozen-armor-86189",
  baseName: "Frozen Armor",
  description:
    '"Increases your Physical and Spell Resistance by |cffffff620|r for each Winter\'s Embrace ability slotted.\\n\\nCurrent Bonus: |cffffff0|r."',
  icon: "/esoui/art/icons/passive_warden_001.dds",
  esoSkillId: 86189,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "warden-winters-embrace",
  skillType: "passive",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill

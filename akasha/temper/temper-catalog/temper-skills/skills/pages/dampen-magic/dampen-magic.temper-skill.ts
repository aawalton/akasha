import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dampenMagic = {
  id: "019e6238-c2af-770a-a818-9bbc8af0326d",
  pageTypeSlug: "temper-skill",
  slug: "dampen-magic",
  title: "Dampen Magic",
  key: "dampen-magic",
  baseName: "Annulment",
  description:
    '"Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs 3718 damage for 6 seconds. Damage shield strength capped at 60% of your Max Health.\\n\\nEach piece of Light Armor worn increases the amount of damage absorbed by 6%."',
  icon: "/esoui/art/icons/ability_armor_003_a.dds",
  esoSkillId: 41113,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 8,
  skillLineId: "armor-light-armor",
  skillType: "active",
  subcategoryId: "armor-light-armor",
} as const satisfies TemperSkill

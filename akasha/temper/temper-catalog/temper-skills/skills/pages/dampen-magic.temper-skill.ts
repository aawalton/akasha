import type { TemperSkill } from "../temper-skill.page-type.ts"

export const dampenMagic = {
  id: "01a05fd0-8df8-7040-a4a2-6490b9a91b6c",
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

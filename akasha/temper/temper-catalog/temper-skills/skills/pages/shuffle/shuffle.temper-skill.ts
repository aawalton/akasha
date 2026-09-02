import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shuffle = {
  id: "01a05fd1-7cc3-7f8a-b9c7-718748229a8a",
  pageTypeSlug: "temper-skill",
  slug: "shuffle",
  title: "Shuffle",
  key: "shuffle",
  baseName: "Evasion",
  description:
    '"Shroud yourself in mist to gain Major Evasion, decreasing damage taken from area attacks by 20% for 20 seconds.\\n\\nEach piece of Medium Armor worn removes and grants immunity to snares and immobilizations for 1 second."',
  icon: "/esoui/art/icons/ability_armor_002_a.dds",
  esoSkillId: 41131,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 8,
  skillLineId: "armor-medium-armor",
  skillType: "active",
  subcategoryId: "armor-medium-armor",
} as const satisfies TemperSkill

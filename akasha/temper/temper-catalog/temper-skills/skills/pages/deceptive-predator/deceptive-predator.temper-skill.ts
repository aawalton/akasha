import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deceptivePredator = {
  id: "01a05fd0-8e02-7ceb-bda0-8e91b11ca71f",
  pageTypeSlug: "temper-skill",
  slug: "deceptive-predator",
  title: "Deceptive Predator",
  key: "deceptive-predator",
  baseName: "Falcon's Swiftness",
  description:
    '"Invoke the spirit of agility to gain Major Expedition for 6 seconds, increasing your Movement Speed by 30%.\\n\\nGain immunity to snares and immobilizations for 4 seconds.\\n\\nWhile slotted you gain Minor Evasion, reducing damage from area attacks by 10%."',
  icon: "/esoui/art/icons/ability_warden_016_b.dds",
  esoSkillId: 86044,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
  effects: "jsonl",
} as const satisfies TemperSkill

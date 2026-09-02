import type { TemperSkill } from "../temper-skill.page-type.ts"

export const birdOfPrey = {
  id: "01a05fd0-4362-731b-b2ee-6d083dffe2be",
  pageTypeSlug: "temper-skill",
  slug: "bird-of-prey",
  title: "Bird of Prey",
  key: "bird-of-prey",
  baseName: "Falcon's Swiftness",
  description:
    '"Invoke the spirit of agility to gain Major Expedition for 6 seconds, increasing your Movement Speed by 30%.\\n\\nGain immunity to snares and immobilizations for 4 seconds.\\n\\nWhile slotted you gain Minor Berserk, increasing your damage done by 5%."',
  icon: "/esoui/art/icons/ability_warden_016_a.dds",
  esoSkillId: 86048,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill

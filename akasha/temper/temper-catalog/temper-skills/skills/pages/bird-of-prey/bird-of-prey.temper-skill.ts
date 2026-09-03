import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const birdOfPrey = {
  id: "019e6245-a5f7-7251-9262-2ce8e8776426",
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
  effects: "jsonl",
} as const satisfies TemperSkill

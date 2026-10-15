import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const birdOfPrey = {
  id: "019e6245-a5f7-7251-9262-2ce8e8776426",
  type: "page-type/temper-skill",
  slug: "bird-of-prey",
  title: "Bird of Prey",
  key: "bird-of-prey",
  baseName: "Falcon's Swiftness",
  description:
    "Invoke the spirit of agility to gain Major Expedition for 6 seconds, increasing your Movement Speed by 30%.\n\nGain immunity to snares and immobilizations for 4 seconds.\n\nWhile slotted you gain Minor Berserk, increasing your damage done by 5%.",
  icon: "/esoui/art/icons/ability_warden_016_a.dds",
  esoSkillId: 86048,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 94,
  createdAt: "2026-05-26T03:13:12.183Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = Minor Berserk (Constant)",
    "<<5>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill

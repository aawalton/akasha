import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const birdOfPrey86045 = {
  id: "019e6f53-9f0f-76ce-b338-9f1fb95e54af",
  type: "page-type/temper-skill",
  slug: "bird-of-prey-86045",
  title: "Bird of Prey",
  key: "bird-of-prey-86045",
  baseName: "Falcon's Swiftness",
  description:
    "Invoke the spirit of agility to gain Major Expedition for |cffffff6|r seconds, increasing your Movement Speed by |cffffff30|r%.\n\nGain immunity to snares and immobilizations for |cffffff4|r seconds.\n\nWhile slotted you gain Minor Berserk, increasing your damage done by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_warden_016_a.dds",
  esoSkillId: 86045,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 95,
  createdAt: "2026-05-28T16:03:31.727Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = Minor Berserk (Constant)",
    "<<5>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill

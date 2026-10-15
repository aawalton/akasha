import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const blindingFlare = {
  id: "019e6251-4c8b-7fc3-8e29-3c841cebf423",
  type: "page-type/temper-skill",
  slug: "blinding-flare",
  title: "Blinding Flare",
  key: "blinding-flare",
  baseName: "Revealing Flare",
  description:
    "Launch a blinding flare, revealing stealthed and invisible enemies in the target area for 5 seconds. Exposed enemies are stunned for 4 seconds, and cannot return to stealth or invisibility for 4 seconds.\n\nWhile slotted you gain Major Protection, reducing your damage taken by 10%.",
  icon: "/esoui/art/icons/ability_ava_scorching_flare.dds",
  esoSkillId: 63415,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 111,
  createdAt: "2026-05-26T03:25:55.723Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = Major Protection (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill

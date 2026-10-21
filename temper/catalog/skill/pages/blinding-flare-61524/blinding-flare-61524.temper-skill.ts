import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const blindingFlare61524 = {
  id: "019e6f53-9f3f-75cc-b9b2-b33e98f3de2e",
  type: "page-type/temper-skill",
  slug: "blinding-flare-61524",
  title: "Blinding Flare",
  key: "blinding-flare-61524",
  baseName: "Revealing Flare",
  description:
    "Launch a blinding flare, revealing stealthed and invisible enemies in the target area for |cffffff5|r seconds. Exposed enemies are stunned for |cffffff4|r seconds, and cannot return to stealth or invisibility for |cffffff4|r seconds.\n\nWhile slotted you gain Major Protection, reducing your damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_ava_scorching_flare.dds",
  esoSkillId: 61524,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 2,
  rank: 7,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 112,
  createdAt: "2026-05-28T16:03:31.775Z",
  updatedAt: "2026-10-21T01:40:37.191Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = Major Protection (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill

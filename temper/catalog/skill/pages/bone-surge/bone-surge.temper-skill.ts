import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boneSurge = {
  id: "019e6238-c29b-7e54-8f20-5a193d0b1033",
  type: "page-type/temper-skill",
  slug: "bone-surge",
  title: "Bone Surge",
  key: "bone-surge",
  baseName: "Bone Shield",
  description:
    "Surround yourself with a whirlwind of bones, gaining a damage shield that absorbs up to 5121 damage for 6 seconds. This ability scales off your Max Health.\n\nAn ally near you can activate the Spinal Surge synergy, granting up to 6 allies a damage shield that absorbs up to 30% of their Max Health for 6 seconds and Major Vitality, increasing their healing received and damage shield strength by 12%.",
  icon: "/esoui/art/icons/ability_undaunted_005a.dds",
  esoSkillId: 43334,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 146,
  createdAt: "2026-05-26T02:59:07.547Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3201267 Health (Health, RankMod(1.033), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = Spinal Surge (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 6 seconds (Constant)",
    "<<6>> = Major Vitality (Constant)",
    "<<7>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill

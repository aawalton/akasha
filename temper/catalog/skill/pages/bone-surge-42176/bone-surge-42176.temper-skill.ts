import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boneSurge42176 = {
  id: "019e6f53-9f74-7154-a337-ddfc46c60d00",
  type: "page-type/temper-skill",
  slug: "bone-surge-42176",
  title: "Bone Surge",
  key: "bone-surge-42176",
  baseName: "Bone Shield",
  description:
    "Surround yourself with a whirlwind of bones, gaining a damage shield that absorbs up to |cffffff7258|r damage for |cffffff6|r seconds. This ability scales off your Max Health.\n\nAn ally near you can activate the Spinal Surge synergy, granting up to |cffffff6|r allies a damage shield that absorbs up to |cffffff35|r% of their Max Health for |cffffff6|r seconds and Major Vitality, increasing their healing received and damage shield strength by |cffffff12|r%.",
  icon: "/esoui/art/icons/ability_undaunted_005a.dds",
  esoSkillId: 42176,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 147,
  createdAt: "2026-05-28T16:03:31.828Z",
  updatedAt: "2026-10-21T05:02:44.400Z",
  equations: [
    "<<1>> = 0.3099 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = Spinal Surge (Constant)",
    "<<8>> = 6 (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 6 seconds (Constant)",
    "<<6>> = Major Vitality (Constant)",
    "<<7>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill

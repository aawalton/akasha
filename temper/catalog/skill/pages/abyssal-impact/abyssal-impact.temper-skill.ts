import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const abyssalImpact = {
  id: "019e6f53-9e87-7a50-a72d-59cc5b209b3d",
  type: "page-type/temper-skill",
  slug: "abyssal-impact",
  title: "Abyssal Impact",
  key: "abyssal-impact",
  baseName: "Abyssal Impact",
  description:
    "Infuse your arm with abyssal magic to form tentacles that lash out at your foes, dealing |cffffff7125|r Physical Damage. Enemies are immobilized for |cffffff3|r seconds and marked with Abyssal Ink for |cffffff20|r seconds.\n\nYou deal |cffffff5|r% increased damage to enemies drenched in Abyssal Ink.",
  icon: "/esoui/art/icons/ability_arcanist_003.dds",
  esoSkillId: 185817,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 8,
  createdAt: "2026-05-28T16:03:31.591Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.08625 MaxStat + 0.905625 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, 0.3s cooldown, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 17 seconds (Constant)",
    "<<4>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill

import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const audaciousRunemend = {
  id: "019e6245-a5ee-73c9-ac62-27b2694a45dd",
  type: "page-type/temper-skill",
  slug: "audacious-runemend",
  title: "Audacious Runemend",
  key: "audacious-runemend",
  baseName: "Runemend",
  description:
    "Craft a series of virtuous Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for 1199 Health three times and generate Crux. \n\nHealing a target under 50% Health grants them Minor Heroism for 6 seconds, generating 1 Ultimate every 1.5 seconds.\n\nEach active Crux reduces the cost of this ability by 3%.",
  icon: "/esoui/art/icons/ability_arcanist_013_b.dds",
  esoSkillId: 40186191,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 58,
  createdAt: "2026-05-26T03:13:12.174Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05335445 MaxStat + 0.560221725 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = Minor Heroism (Constant)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 1 (Constant)",
    "<<5>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill

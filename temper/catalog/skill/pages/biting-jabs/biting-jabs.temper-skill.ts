import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bitingJabs = {
  id: "019e6245-a5f8-727f-bda8-7293c7ddbed0",
  type: "page-type/temper-skill",
  slug: "biting-jabs",
  title: "Biting Jabs",
  key: "biting-jabs",
  baseName: "Puncturing Strikes",
  description:
    "Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals 919 Physical Damage per strike and reduces enemy Movement Speed by 40% for 0.5 seconds. Each strike has a 10% chance of applying the Sundered status effect.\n\nActivating this ability grants you Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by 20% for 10 seconds.",
  icon: "/esoui/art/icons/ability_templar_recovery.dds",
  esoSkillId: 27197,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 96,
  createdAt: "2026-05-26T03:13:12.184Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.040904734 MaxStat + 0.429503839 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 40% (Constant)",
    "<<3>> = 0.5 seconds (Constant)",
    "<<4>> = Sundered (Constant)",
    "<<5>> = Major Brutality (Constant)",
    "<<6>> = 20% (Constant)",
    "<<7>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill

import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const blightedBlastbones = {
  id: "019e6245-a5fc-775f-bab6-4540622c9f41",
  type: "page-type/temper-skill",
  slug: "blighted-blastbones",
  title: "Blighted Blastbones",
  key: "blighted-blastbones",
  baseName: "Sacrificial Bones",
  description:
    "Summon a decaying skeleton from the ground after 2.5 seconds. The skeleton runs after the target and explodes when it gets close to them, dealing 3600 Disease Damage to all enemies nearby and applying the Diseased status effect and Major Defile to them for 4 seconds, reducing their healing received and damage shield strength by 12%.\n\nCreates a corpse on death.",
  icon: "/esoui/art/icons/ability_necromancer_002_a.dds",
  esoSkillId: 40117690,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 109,
  createdAt: "2026-05-26T03:13:12.188Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2.5 seconds (Constant)",
    "<<2>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Disease, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = Diseased (Constant)",
    "<<4>> = 4 seconds (Constant)",
    "<<5>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill

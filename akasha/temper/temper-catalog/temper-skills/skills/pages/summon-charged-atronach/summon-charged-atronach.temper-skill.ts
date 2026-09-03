import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonChargedAtronach = {
  id: "019e6245-a745-7934-bcf8-c37da0209536",
  pageTypeSlug: "temper-skill",
  slug: "summon-charged-atronach",
  title: "Summon Charged Atronach",
  key: "summon-charged-atronach",
  baseName: "Summon Storm Atronach",
  description:
    '"Summon an immobile storm atronach at the target location. Its arrival deals 2323 Shock Damage and stuns enemies for 3 seconds. The atronach calls upon a lightning storm every 2 seconds, dealing 2323 Shock Damage to enemies around it. \\n\\nEnemies hit are afflicted with the Concussion status effect.\\n\\nAn ally near the atronach can activate the Charged Lightning synergy, granting nearby allies Major Berserk for 10 seconds, increasing their damage done by 10%."',
  icon: "/esoui/art/icons/ability_sorcerer_endless_atronachs.dds",
  esoSkillId: 30553,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "ultimate",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill

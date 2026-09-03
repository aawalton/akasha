import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const engulfingDragonfire = {
  id: "019e6245-a66e-769d-9adb-b0fb20d4dcce",
  pageTypeSlug: "temper-skill",
  slug: "engulfing-dragonfire",
  title: "Engulfing Dragonfire",
  key: "engulfing-dragonfire",
  baseName: "Dragonfire Breath",
  description:
    '"Breathe forth an unending torrent of draconic fire, dealing 5507 Flame Damage every 0.5 seconds in a channeled attack over 4.8 seconds.\\n\\nEach tick increases the damage dealt by 5%, up to a maximum of 50%. While Take Flight is active you always deal maximum damage.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_dragonknight_004_b.dds",
  esoSkillId: 20930,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill

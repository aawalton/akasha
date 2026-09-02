import type { TemperSkill } from "../temper-skill.page-type.ts"

export const encase = {
  id: "01a05fd0-8e1c-7e9d-bc63-c3995774d038",
  pageTypeSlug: "temper-skill",
  slug: "encase",
  title: "Encase",
  key: "encase",
  baseName: "Encase",
  description:
    '"Call forth Daedric shards from the earth to immobilize enemies in front of you for |cffffff4|r seconds.\\n\\nEnemies hit are afflicted with Major Maim, reducing their damage done by |cffffff10|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_cyclone.dds",
  esoSkillId: 28025,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill

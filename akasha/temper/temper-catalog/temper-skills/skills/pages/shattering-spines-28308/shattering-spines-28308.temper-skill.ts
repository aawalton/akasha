import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shatteringSpines28308 = {
  id: "01a05fd1-7cbc-7954-a0b4-e89d705e4a6e",
  pageTypeSlug: "temper-skill",
  slug: "shattering-spines-28308",
  title: "Shattering Spines",
  key: "shattering-spines-28308",
  baseName: "Encase",
  description:
    '"Call forth Daedric shards from the earth to encase and immobilize all enemies in front of you for |cffffff4|r seconds. After the effect ends the shards shatter, dealing |cffffff7272|r Magic Damage to any enemy that was encased.\\n\\nEnemies hit are afflicted with Major Maim, reducing their damage done by |cffffff10|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_twister.dds",
  esoSkillId: 28308,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill

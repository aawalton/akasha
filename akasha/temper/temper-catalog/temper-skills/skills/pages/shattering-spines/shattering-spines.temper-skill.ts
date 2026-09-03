import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shatteringSpines = {
  id: "019e6245-a72c-7fd5-b798-eebf800b56e3",
  pageTypeSlug: "temper-skill",
  slug: "shattering-spines",
  title: "Shattering Spines",
  key: "shattering-spines",
  baseName: "Encase",
  description:
    '"Call forth Daedric shards from the earth to encase and immobilize all enemies in front of you for 4 seconds. After the effect ends the shards shatter, dealing 1979 Magic Damage to any enemy that was encased.\\n\\nEnemies hit are afflicted with Major Maim, reducing their damage done by 10% for 10 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_twister.dds",
  esoSkillId: 30095,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill

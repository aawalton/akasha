import type { TemperSkill } from "../temper-skill.page-type.ts"

export const shatterSoul = {
  id: "01a05fd1-7cbb-7b47-bee9-25477bc3be61",
  pageTypeSlug: "temper-skill",
  slug: "shatter-soul",
  title: "Shatter Soul",
  key: "shatter-soul",
  baseName: "Soul Strike",
  description:
    '"Burn an enemy from the inside with soulfire, dealing 14814 Magic Damage over 5 seconds.  Upon completion, the soulfire overflows and explodes from the enemy, dealing 2399 Magic Damage to all enemies near them.\\n\\nWhile channeling this ability, you gain immunity to all disabling effects.\\n\\nEnemies affected by this ability are revealed for 3 seconds and may not enter stealth or invisibility.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_otherclass_002_a.dds",
  esoSkillId: 43109,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-soul-magic",
  skillType: "ultimate",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill

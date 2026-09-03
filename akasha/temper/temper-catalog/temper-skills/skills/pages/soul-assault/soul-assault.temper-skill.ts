import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulAssault = {
  id: "019e6251-4ceb-7a1a-8624-f8f97cb11f25",
  pageTypeSlug: "temper-skill",
  slug: "soul-assault",
  title: "Soul Assault",
  key: "soul-assault",
  baseName: "Soul Strike",
  description:
    '"Burn an enemy from the inside with soulfire, dealing 20400 Magic Damage over 6 seconds.\\n\\nWhile channeling this ability, you gain immunity to all disabling effects.\\n\\nEnemies affected by this ability are revealed for 3 seconds and may not enter stealth or invisibility.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_otherclass_002_b.dds",
  esoSkillId: 43099,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "world-soul-magic",
  skillType: "ultimate",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill

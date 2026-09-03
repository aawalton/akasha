import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulAssault40420 = {
  id: "019e6f53-a760-73ff-94e7-2452881fdc10",
  pageTypeSlug: "temper-skill",
  slug: "soul-assault-40420",
  title: "Soul Assault",
  key: "soul-assault-40420",
  baseName: "Soul Strike",
  description:
    '"Burn an enemy from the inside with soulfire, dealing |cffffff66904|r Magic Damage over |cffffff6|r seconds.\\n\\nWhile channeling this ability, you gain immunity to all disabling effects.\\n\\nEnemies affected by this ability are revealed for |cffffff3|r seconds and may not enter stealth or invisibility.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_otherclass_002_b.dds",
  esoSkillId: 40420,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "world-soul-magic",
  skillType: "ultimate",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill

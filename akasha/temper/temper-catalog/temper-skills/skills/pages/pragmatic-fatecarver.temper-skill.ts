import type { TemperSkill } from "../temper-skill.page-type.ts"

export const pragmaticFatecarver = {
  id: "01a05fd1-2e1b-7611-a065-5f7abce7ade3",
  pageTypeSlug: "temper-skill",
  slug: "pragmatic-fatecarver",
  title: "Pragmatic Fatecarver",
  key: "pragmatic-fatecarver",
  baseName: "Fatecarver",
  description:
    '"Channel a beam of energy in front of you for up to 4 seconds, dealing 879 Magic Damage every 0.3 seconds to up to 6 enemies, and gain a damage shield that absorbs up to 3137 damage and grants interrupt immunity.\\n\\nCasting Pragmatic Fatecarver consumes all Crux and increases damage done by 33%, and decreases cost by 16% per Crux spent.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_arcanist_002_b.dds",
  esoSkillId: 193398,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill

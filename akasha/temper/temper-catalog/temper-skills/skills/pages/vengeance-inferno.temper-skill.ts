import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceInferno = {
  id: "01a05fd1-d2ad-7313-8249-d63821bf2baa",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-inferno",
  title: "Vengeance Inferno",
  key: "vengeance-inferno",
  baseName: "Vengeance Inferno",
  description:
    '"Surround yourself in an aura of flames, granting you Major Berserk for |cffffff20|r seconds, increasing your damage done by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_002.dds",
  esoSkillId: 237624,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-ardent-flame",
} as const satisfies TemperSkill

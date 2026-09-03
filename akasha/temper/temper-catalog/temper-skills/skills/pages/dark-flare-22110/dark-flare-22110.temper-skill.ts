import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkFlare22110 = {
  id: "019e6f53-a079-7bd9-9399-0e3305b37d5c",
  pageTypeSlug: "temper-skill",
  slug: "dark-flare-22110",
  title: "Dark Flare",
  key: "dark-flare-22110",
  baseName: "Solar Flare",
  description:
    '"Conjure a ball of solar energy to heave at an enemy, dealing |cffffff8635|r Magic Damage and increasing your damage done with class abilities by |cffffff5|r% for |cffffff10|r seconds.\\n\\nAfflicts the target and enemies within |cffffff8|r meters with Major Defile, reducing their healing received and damage shield strength by |cffffff12|r% for |cffffff4|r seconds.\\n \\nAlso grants you Empower for |cffffff10|r seconds, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r%."',
  icon: "/esoui/art/icons/ability_templar_dark_flare.dds",
  esoSkillId: 22110,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill

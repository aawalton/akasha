import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lingeringFlare61519 = {
  id: "019e6f53-a409-7649-b291-e386b447a092",
  pageTypeSlug: "temper-skill",
  slug: "lingering-flare-61519",
  title: "Lingering Flare",
  key: "lingering-flare-61519",
  baseName: "Revealing Flare",
  description:
    '"Launch a blinding flare, revealing stealthed and invisible enemies in the target area for |cffffff10|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\\n\\nWhile slotted you gain Major Protection, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_ava_lingering_flare.dds",
  esoSkillId: 61519,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 7,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill

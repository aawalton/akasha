import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const expertHunter = {
  id: "01a05fd0-8e2b-7da9-9f20-8b828221c667",
  pageTypeSlug: "temper-skill",
  slug: "expert-hunter",
  title: "Expert Hunter",
  key: "expert-hunter",
  baseName: "Expert Hunter",
  description:
    '"Invoke your expertise in anatomy and enemy behavior to detect stealthed and invisible enemies around you for |cffffff5|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_fightersguild_002.dds",
  esoSkillId: 35762,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill

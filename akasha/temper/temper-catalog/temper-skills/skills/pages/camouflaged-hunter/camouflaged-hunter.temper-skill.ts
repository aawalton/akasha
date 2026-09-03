import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const camouflagedHunter = {
  id: "019e6238-c2a0-7e3f-8eb0-7b430133a375",
  pageTypeSlug: "temper-skill",
  slug: "camouflaged-hunter",
  title: "Camouflaged Hunter",
  key: "camouflaged-hunter",
  baseName: "Expert Hunter",
  description:
    '"Invoke your expertise in anatomy and enemy behavior to detect stealthed and invisible enemies around you for 5 seconds. Exposed enemies cannot return to stealth or invisibility for 4 seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by 2629. You also gain Minor Berserk for 5 seconds after dealing Critical Damage from an enemy\'s flank."',
  icon: "/esoui/art/icons/ability_fightersguild_002_b.dds",
  esoSkillId: 42641,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
  effects: "jsonl",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runicEmbrace = {
  id: "019e6245-a71d-7f3b-8f92-e4a5667c697c",
  pageTypeSlug: "temper-skill",
  slug: "runic-embrace",
  title: "Runic Embrace",
  key: "runic-embrace",
  baseName: "Runic Jolt",
  description:
    '"Craft a rune that deals 1161 Magic Damage and heals you for 1706 Health, scaling off your Max Health.\\n\\nYou apply Minor Maim and Minor Lifesteal for 15 seconds, reducing enemy damage done by 5%, and healing you and your allies for 600 Health every 1 second when damaging them.\\n\\nThe rune taunts for 15 seconds if it would not cause taunt immunity, and generates Crux. While slotted, damage taken is reduced by 2% per active Crux."',
  icon: "/esoui/art/icons/ability_arcanist_007_b.dds",
  esoSkillId: 40186531,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill

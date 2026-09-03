import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulSiphon = {
  id: "019e6245-a73a-7ff5-910f-8bb8cb978e38",
  pageTypeSlug: "temper-skill",
  slug: "soul-siphon",
  title: "Soul Siphon",
  key: "soul-siphon",
  baseName: "Soul Shred",
  description:
    '"Sanctify your soul and the souls of nearby allies with a night rune, healing for 3600 Health and an additional 9384 Health over 4 seconds.\\n\\nYou and your allies will also receive Major Vitality, increasing your healing received and damage shield strength by 12% for 4 seconds.\\n\\nAn ally can target a nearby enemy and activate the Soul Leech synergy, dealing 3122 Magic Damage to them and healing for the damage caused."',
  icon: "/esoui/art/icons/ability_nightblade_018_b.dds",
  esoSkillId: 36186,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-siphoning",
  skillType: "ultimate",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill

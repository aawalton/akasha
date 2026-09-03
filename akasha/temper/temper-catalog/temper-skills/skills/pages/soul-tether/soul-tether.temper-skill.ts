import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulTether = {
  id: "019e6245-a73d-7239-a2ab-bb07746f5871",
  pageTypeSlug: "temper-skill",
  slug: "soul-tether",
  title: "Soul Tether",
  key: "soul-tether",
  baseName: "Soul Shred",
  description:
    '"Ravage nearby enemies\' souls with a night rune, dealing 3600 Magic Damage, healing for half the damage, and stunning them for 4 seconds. \\n\\nRavaged enemies are tethered to you for 8 seconds, and while they remain within 10 meters, you siphon 627 Health from them every second.\\n\\nAn ally can target a ravaged enemy and activate the Soul Leech synergy, dealing 3122 Magic Damage to them and healing for the damage caused."',
  icon: "/esoui/art/icons/ability_nightblade_018_a.dds",
  esoSkillId: 36207,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "ultimate",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill

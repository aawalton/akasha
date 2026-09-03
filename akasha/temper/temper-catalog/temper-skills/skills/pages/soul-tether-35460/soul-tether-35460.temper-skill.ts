import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulTether35460 = {
  id: "019e6f53-a77d-70d1-a6de-85ca196a8994",
  pageTypeSlug: "temper-skill",
  slug: "soul-tether-35460",
  title: "Soul Tether",
  key: "soul-tether-35460",
  baseName: "Soul Shred",
  description:
    '"Ravage nearby enemies\' souls with a night rune, dealing |cffffff13224|r Magic Damage, healing for half the damage, and stunning them for |cffffff4|r seconds. \\n\\nRavaged enemies are tethered to you for |cffffff8|r seconds, and while they remain within |cffffff10|r meters, you siphon |cffffff2056|r Health from them every second.\\n\\nAn ally can target a ravaged enemy and activate the Soul Leech synergy, dealing |cffffff10851|r Magic Damage to them and healing for the damage caused."',
  icon: "/esoui/art/icons/ability_nightblade_018_a.dds",
  esoSkillId: 35460,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "ultimate",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill

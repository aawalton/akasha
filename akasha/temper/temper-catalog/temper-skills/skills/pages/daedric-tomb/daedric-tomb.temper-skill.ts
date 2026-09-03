import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricTomb = {
  id: "019e6245-a635-7e9a-af3a-9d52a6fec991",
  pageTypeSlug: "temper-skill",
  slug: "daedric-tomb",
  title: "Daedric Tomb",
  key: "daedric-tomb",
  baseName: "Daedric Mines",
  description:
    '"Surprise your foes by placing 3 volatile Daedric mines at a target location, which arm instantly and last for 15 seconds.\\n\\nWhen a mine is triggered it explodes, dealing 2700 Magic Damage and immobilizing the enemy for 2 seconds. Enemies can only be damaged by your mines once every 2 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_daedric_tomb.dds",
  esoSkillId: 29939,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill

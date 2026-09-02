import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodMist = {
  id: "01a05fd0-436f-796d-86bd-95f4fd2700a9",
  pageTypeSlug: "temper-skill",
  slug: "blood-mist",
  title: "Blood Mist",
  key: "blood-mist",
  baseName: "Mist Form",
  description:
    '"Dissolve into a bloody mist, causing the next 3 projectiles to deal no damage to you for 1 second while you dash forward and reappear at your target location after a short duration.\\n\\nUpon activation you drain the blood of those around you for 20 seconds, dealing 435 Magic Damage every 2 seconds to enemies and healing you for 45% of the damage caused.\\n\\nCasting again within 4 seconds costs 33% more Magicka."',
  icon: "/esoui/art/icons/ability_u26_vampire_05_b.dds",
  esoSkillId: 41824,
  isMorph: true,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill

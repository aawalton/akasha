import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const thriveInChaos = {
  id: "019e6226-0119-79f0-abb9-d482c8099882",
  pageTypeSlug: "temper-skill",
  slug: "thrive-in-chaos",
  title: "Thrive in Chaos",
  key: "thrive-in-chaos",
  baseName: "Lacerate",
  description:
    '"Slash enemies in front of you, causing them to bleed for 6965 Bleed Damage over 8 seconds and healing you for 50% of the damage done.\\n\\nEach enemy hit increases your damage done by 6% for 15 seconds. This effect can stack up to 6 times.\\n\\nEach tick applies the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_dualwield_006_b.dds",
  esoSkillId: 86410,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-dual-wield",
  skillType: "ultimate",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const thriveInChaos85179 = {
  id: "019e6f53-a83b-7826-932d-8c3fb4d3b071",
  pageTypeSlug: "temper-skill",
  slug: "thrive-in-chaos-85179",
  title: "Thrive in Chaos",
  key: "thrive-in-chaos-85179",
  baseName: "Lacerate",
  description:
    '"Slash enemies in front of you, causing them to bleed for |cffffff22855|r Bleed Damage over |cffffff8|r seconds and healing you for |cffffff51|r% of the damage done.\\n\\nEach enemy hit increases your damage done by |cffffff6|r% for |cffffff15|r seconds. This effect can stack up to |cffffff6|r times.\\n\\nEach tick applies the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_dualwield_006_b.dds",
  esoSkillId: 85179,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "weapon-dual-wield",
  skillType: "ultimate",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

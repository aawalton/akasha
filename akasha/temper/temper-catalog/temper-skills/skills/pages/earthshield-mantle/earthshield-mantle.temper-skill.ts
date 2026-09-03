import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const earthshieldMantle = {
  id: "019e6245-a65d-7e0d-a1b7-7bfc181fbe2d",
  pageTypeSlug: "temper-skill",
  slug: "earthshield-mantle",
  title: "Earthshield Mantle",
  key: "earthshield-mantle",
  baseName: "Earthspike Mantle",
  description:
    '"Envelop your body in molten spikes to increase your damage done by 100 and gain Major Resolve, increasing Physical and Spell Resistance by 5948 for 20 seconds.\\n\\nPower drawn from the heart of a volcano forms a damage shield around you that absorbs up to 6611 damage for 6 seconds, scaling off your Max Health."',
  icon: "/esoui/art/icons/ability_dragonknight_007_b.dds",
  esoSkillId: 20328,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill

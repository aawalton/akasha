import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const earthspikeMantle = {
  id: "019e6f53-a0fe-76f2-8968-087d472f9fbd",
  pageTypeSlug: "temper-skill",
  slug: "earthspike-mantle",
  title: "Earthspike Mantle",
  key: "earthspike-mantle",
  baseName: "Earthspike Mantle",
  description:
    '"Envelop your body in molten spikes to increase your damage done by |cffffff100|r and gain Major Resolve, increasing Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_007.dds",
  esoSkillId: 20319,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill

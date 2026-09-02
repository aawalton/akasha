import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const earthspikeMantle = {
  id: "01a05fd0-8e13-74ee-8663-648785603aee",
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

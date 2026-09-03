import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shatterspikeMantle = {
  id: "019e6245-a72e-7138-8d6b-a1218362076e",
  pageTypeSlug: "temper-skill",
  slug: "shatterspike-mantle",
  title: "Shatterspike Mantle",
  key: "shatterspike-mantle",
  baseName: "Earthspike Mantle",
  description:
    '"Envelop your body in molten spikes to increase your damage done by 100 and gain Major Resolve, increasing Physical and Spell Resistance by 5948 for 20 seconds.\\n\\nAs the armor forms you blast foes around you with shattered obsidian, causing them to take 17006 Flame Damage over 20 seconds. When this effect deals damage you gain a stack of Landslide, up to once every 10 seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_007_a.dds",
  esoSkillId: 20323,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill

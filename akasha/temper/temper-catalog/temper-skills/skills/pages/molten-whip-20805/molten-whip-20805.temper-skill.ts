import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const moltenWhip20805 = {
  id: "019e6f53-a496-719a-a14a-d4ef82e1a04b",
  pageTypeSlug: "temper-skill",
  slug: "molten-whip-20805",
  title: "Molten Whip",
  key: "molten-whip-20805",
  baseName: "Lava Whip",
  description:
    '"Lash an enemy with flame, dealing |cffffff8342|r Flame Damage.\\n\\nActivating a different Dragonknight ability while in combat grants a stack of Seething Fury up to 3 times, increasing the damage of your next Molten Whip by |cffffff33|r% and your damage done by |cffffff5|r%, or |cffffff2|r% against players, for |cffffff10|r seconds. The damage done only activates if you are a Dragonknight."',
  icon: "/esoui/art/icons/ability_dragonknight_001_b.dds",
  esoSkillId: 20805,
  isMorph: true,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill

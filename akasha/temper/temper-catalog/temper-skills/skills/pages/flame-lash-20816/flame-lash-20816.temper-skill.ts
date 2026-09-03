import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const flameLash20816 = {
  id: "019e6f53-a203-732e-be37-37eda729124d",
  pageTypeSlug: "temper-skill",
  slug: "flame-lash-20816",
  title: "Flame Lash",
  key: "flame-lash-20816",
  baseName: "Lava Whip",
  description:
    '"Lash an enemy with flame, dealing |cffffff8076|r Flame Damage and healing for |cffffff2514|r Health.\\n\\nHitting an Off Balance enemy grants |cffffff5|r stacks of Power Lash for |cffffff20|r seconds, up to once every |cffffff20|r seconds.\\n\\nActivating again consumes a stack to deal |cffffff15931|r Flame Damage to your target and all nearby enemies and heals for |cffffff10063|r Health. Consuming all stacks as a Dragonknight increases your damage done by |cffffff7|r%, double against monsters, for |cffffff45|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_001_a.dds",
  esoSkillId: 20816,
  isMorph: true,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill

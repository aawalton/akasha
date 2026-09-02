import type { TemperSkill } from "../temper-skill.page-type.ts"

export const lavaWhip = {
  id: "01a05fd0-dcd4-7f17-9be4-0d922e10de42",
  pageTypeSlug: "temper-skill",
  slug: "lava-whip",
  title: "Lava Whip",
  key: "lava-whip",
  baseName: "Lava Whip",
  description:
    '"Lash an enemy with flame, dealing |cffffff8076|r Flame Damage.\\n\\nHitting an Off Balance enemy grants |cffffff5|r stacks of Volcanic Whip for |cffffff20|r seconds, up to once every |cffffff20|r seconds.\\n\\nVolcanic Whip replaces this ability and consumes a stack to instead deal |cffffff15931|r Flame Damage to your target and all nearby enemies."',
  icon: "/esoui/art/icons/ability_dragonknight_001.dds",
  esoSkillId: 23806,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill

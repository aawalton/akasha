import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonThePhantomOfMyLegend = {
  id: "01a0657d-0302-7f64-a617-58cc9c47b47c",
  type: "page-type/world-skill",
  slug: "summon-the-phantom-of-my-legend",
  title: "Summon: The Phantom of My Legend",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

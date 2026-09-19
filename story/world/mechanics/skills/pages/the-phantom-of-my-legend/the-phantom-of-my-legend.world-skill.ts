import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thePhantomOfMyLegend = {
  id: "01a0657d-0312-7c49-977d-512b38e87151",
  type: "page-type/world-skill",
  slug: "the-phantom-of-my-legend",
  title: "The Phantom of My Legend",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

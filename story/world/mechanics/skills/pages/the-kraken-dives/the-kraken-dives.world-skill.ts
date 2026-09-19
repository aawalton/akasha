import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theKrakenDives = {
  id: "01a0657d-0312-7174-aa91-2c9cee78682b",
  type: "page-type/world-skill",
  slug: "the-kraken-dives",
  title: "The Kraken Dives",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

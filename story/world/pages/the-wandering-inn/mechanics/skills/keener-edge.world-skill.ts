import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const keenerEdge = {
  id: "01a06575-9821-7ef9-b0da-5990fe91ddb2",
  type: "page-type/world-skill",
  slug: "keener-edge",
  title: "Keener Edge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

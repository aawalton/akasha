import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const delayedCut = {
  id: "01a06575-9802-7deb-9085-025327af1286",
  type: "page-type/world-skill",
  slug: "delayed-cut",
  title: "Delayed Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill

import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const stormOfCloudedDarkness = {
  id: "01a06572-95e4-72d4-8b93-7b04a332b115",
  type: "world-spell",
  slug: "storm-of-clouded-darkness",
  title: "Storm of Clouded Darkness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const birdWatcher = {
  id: "01a0657e-133e-769b-84bc-25d97c502a43",
  type: "world-class",
  slug: "bird-watcher",
  title: "Bird Watcher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

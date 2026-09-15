import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const artifactCollector = {
  id: "01a0657e-1331-7765-8df7-2893cb914b6a",
  type: "world-class",
  slug: "artifact-collector",
  title: "Artifact Collector",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

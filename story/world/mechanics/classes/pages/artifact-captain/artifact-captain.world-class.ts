import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const artifactCaptain = {
  id: "01a0657e-01ab-7bb8-8b3f-fd6ba37bd7aa",
  type: "page-type/world-class",
  slug: "artifact-captain",
  title: "Artifact Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

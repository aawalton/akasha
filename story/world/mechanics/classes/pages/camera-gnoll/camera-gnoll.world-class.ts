import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cameraGnoll = {
  id: "01a0657e-01c1-7ded-afbd-6f5965ff3e11",
  type: "page-type/world-class",
  slug: "camera-gnoll",
  title: "Camera Gnoll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

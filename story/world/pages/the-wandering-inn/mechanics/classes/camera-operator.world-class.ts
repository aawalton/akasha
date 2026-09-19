import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cameraOperator = {
  id: "01a0657e-1342-7f48-9c69-1628880a27d7",
  type: "page-type/world-class",
  slug: "camera-operator",
  title: "Camera Operator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

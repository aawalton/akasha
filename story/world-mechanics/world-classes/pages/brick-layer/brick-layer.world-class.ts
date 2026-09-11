import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const brickLayer = {
  id: "01a0657e-01c0-788e-a52b-9111d9bd42f0",
  type: "world-class",
  slug: "brick-layer",
  title: "Brick Layer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

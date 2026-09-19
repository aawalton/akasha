import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const story = {
  id: "01a0b700-14b1-7be0-b5a7-5e8a66c9eece",
  type: "page-type/namespace",
  slug: "story",
  definition: "the stories this repository reads, and what a reading of them gathered",
  parts: ["command/story-character-file"],
  name: "story",
} as const satisfies Namespace

import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const storyTurnKept = {
  id: "01a0ea39-db29-746f-b7ad-aabaa8020c2f",
  type: "page-type/namespace",
  slug: "story-turn-kept",
  definition: "the commands reaching the edits kept beside a played turn",
  parts: ["command/story-turn-kept-list", "command/story-turn-kept-drop"],
  name: "kept",
} as const satisfies Namespace

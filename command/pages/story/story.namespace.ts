import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const story = {
  id: "01a0b700-14b1-7be0-b5a7-5e8a66c9eece",
  type: "page-type/namespace",
  slug: "story",
  definition: "the stories this repository holds, and what a reading of them found",
  parts: [
    "command/story-character-file",
    "command/story-join-unread",
    "command/story-chapter-close",
    "command/story-chapter-write",
    "command/story-settle",
    "command/story-state",
    "namespace/story-turn",
    "command/story-tell",
    "module/settle-asking",
    "module/turn-scenes",
    "module/turn-changes",
  ],
  name: "story",
} as const satisfies Namespace

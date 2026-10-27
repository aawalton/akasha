import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const story = {
  id: "01a0b700-14b1-7be0-b5a7-5e8a66c9eece",
  type: "page-type/namespace",
  slug: "story",
  definition: "the stories this repository holds, and what a reading of them found",
  parts: [
    "command/story-character-file",
    "command/story-chat",
    "command/story-join-unread",
    "command/story-chapter-close",
    "command/story-chapter-write",
    "command/story-settle",
    "command/story-state",
    "namespace/story-turn",
    "command/story-tell",
    "module/settle-asking",
    "module/settle-seeding",
    "module/turn-scenes",
    "module/turn-changes",
    "module/tell-continuing",
    "command/story-chapter-split",
    "module/beat-rejoining",
  ],
  name: "story",
  createdAt: "2026-09-19T00:10:30.961Z",
  updatedAt: "2026-10-27T19:13:15.832Z",
} as const satisfies Namespace

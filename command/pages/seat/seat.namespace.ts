import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const seat = {
  id: "01a0797a-9a06-74a3-9d34-57124a4d5b45",
  type: "page-type/namespace",
  slug: "seat",
  definition: "the seats akasha carries and what runs them",
  parts: [
    "command/seat-messaged",
    "command/seat-refresh-settings",
    "command/seat-reset",
    "command/seat-resume",
    "command/seat-start",
    "command/seat-transcript-list",
    "namespace/seat-supervisor",
    "command/seat-transcript-follow",
    "command/seat-send",
  ],
  name: "seat",
} as const satisfies Namespace

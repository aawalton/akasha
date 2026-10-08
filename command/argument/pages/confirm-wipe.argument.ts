import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const confirmWipe = {
  id: "01a094ea-1bfb-70cc-8702-09fbbd2a54a5",
  type: "page-type/argument",
  slug: "confirm-wipe",
  said: "--confirm-wipe",
  takes: "the acknowledgement that the install disk is overwritten",
  value: "none",
  createdAt: "2026-09-12T09:19:25.691Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

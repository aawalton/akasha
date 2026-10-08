import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const repeatState = {
  id: "01a0a029-4e93-7ad0-a071-0c44a240c5a9",
  type: "page-type/argument",
  slug: "repeat-state",
  said: "--repeat",
  takes: "whether a device plays the one track again, the whole queue again, or neither",
  value: "text",
  placeholder: "track|context|off",
  createdAt: "2026-09-14T13:44:16.787Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

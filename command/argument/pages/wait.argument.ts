import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const wait = {
  id: "01a094c7-eac4-7a5e-ba34-2098bfa5071d",
  type: "page-type/argument",
  slug: "wait",
  said: "--wait",
  takes: "hold until the build is valid or has failed rather than answering once",
  value: "none",
  createdAt: "2026-09-12T08:42:04.868Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

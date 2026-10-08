import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const simulator = {
  id: "01a09501-4e8d-7c82-9bd0-9faf0428e620",
  type: "page-type/argument",
  slug: "simulator",
  said: "--simulator",
  takes: "install an ios app on a simulator rather than hand it to Apple",
  value: "none",
  createdAt: "2026-09-12T09:44:45.965Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

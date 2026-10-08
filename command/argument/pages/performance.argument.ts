import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const performance = {
  id: "01a094f2-63f3-79dc-b708-61aaf21e7a17",
  type: "page-type/argument",
  slug: "performance",
  said: "--performance",
  takes: "the slug of the one performance to run",
  value: "text",
  createdAt: "2026-09-12T09:28:28.403Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

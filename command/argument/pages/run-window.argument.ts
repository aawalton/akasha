import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const runWindow = {
  id: "01a094f1-18d5-7594-a907-2d8adf4ebe84",
  type: "page-type/argument",
  slug: "run-window",
  said: "--last",
  takes: "how many of the most recent runs the numbers cover, or a period ending now",
  value: "text",
  placeholder: "window",
  createdAt: "2026-09-12T09:27:03.637Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

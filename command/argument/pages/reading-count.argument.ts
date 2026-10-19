import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const readingCount = {
  id: "01a155d4-d19b-7462-9bf3-f71c9bb67589",
  type: "page-type/argument",
  slug: "reading-count",
  said: "--last",
  takes: "how many readings are shown, counted back from the newest",
  value: "whole-number",
  placeholder: "n",
  default: "3",
  createdAt: "2026-10-19T20:22:53.082Z",
  updatedAt: "2026-10-19T20:22:53.082Z",
} as const satisfies Argument

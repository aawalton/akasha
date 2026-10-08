import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const batch = {
  id: "01a094e6-1e6a-7e90-8d31-575d2caae9e8",
  type: "page-type/argument",
  slug: "batch",
  said: "--batch",
  takes: "how many readings one write carries, 1 to 1000",
  value: "whole-number",
  placeholder: "n",
  default: "1000",
  createdAt: "2026-09-12T09:15:04.170Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

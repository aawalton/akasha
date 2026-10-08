import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const through = {
  id: "01a0d4e4-4ae9-7e19-9bd8-b59f33a26a55",
  type: "page-type/argument",
  slug: "through",
  said: "--through",
  takes: "the number of the last turn a chapter takes",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-24T19:28:46.313Z",
  updatedAt: "2026-09-24T19:31:24.000Z",
} as const satisfies Argument

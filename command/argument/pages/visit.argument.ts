import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const visit = {
  id: "01a09607-fd36-7abb-985c-b6863819a821",
  type: "page-type/argument",
  slug: "visit",
  said: "--visit",
  takes: "which visit to read, counted back from the most recent",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T14:31:41.110Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

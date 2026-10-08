import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const tail = {
  id: "01a094b7-52bf-7d29-b278-b640e5d2f5be",
  type: "page-type/argument",
  slug: "tail",
  said: "--tail",
  takes: "how many trailing lines to answer with",
  value: "whole-number",
  placeholder: "n",
  default: "100",
  createdAt: "2026-09-12T08:23:57.375Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

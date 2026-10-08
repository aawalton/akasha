import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const expectCount = {
  id: "01a094ce-542c-783c-b1f8-7cc98a0368a6",
  type: "page-type/argument",
  slug: "expect-count",
  said: "--expect-count",
  takes: "how many of those elements are to be there",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:49:05.068Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

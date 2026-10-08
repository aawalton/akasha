import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const show = {
  id: "01a094fa-2e8e-7c9f-99d8-de204dfa80d9",
  type: "page-type/argument",
  slug: "show",
  said: "--show",
  takes: "the whole prompt put for each case shown and the whole answer back",
  value: "none",
  createdAt: "2026-09-12T09:36:59.022Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

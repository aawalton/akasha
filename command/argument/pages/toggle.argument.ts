import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toggle = {
  id: "01a094d2-57a9-7f52-a06e-4355f1af02ea",
  type: "page-type/argument",
  slug: "toggle",
  said: "--toggle",
  takes: "the automation toggle set",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:53:28.105Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

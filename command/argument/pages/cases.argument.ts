import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const cases = {
  id: "01a094f9-636e-78a1-bd7d-2529e54b309b",
  type: "page-type/argument",
  slug: "cases",
  said: "--cases",
  takes: "the model test whose cases are used, its own by default",
  value: "text",
  placeholder: "test",
  createdAt: "2026-09-12T09:36:07.022Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

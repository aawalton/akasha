import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const scope = {
  id: "01a094d1-f4bb-7584-b51f-de1319713109",
  type: "page-type/argument",
  slug: "scope",
  said: "--scope",
  takes: "the scope set, as `global`, `character:<id>` or `companion:<id>`",
  value: "text",
  placeholder: "scope",
  createdAt: "2026-09-12T08:53:02.779Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

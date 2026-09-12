import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const scope = {
  id: "01a094d1-f4bb-7584-b51f-de1319713109",
  type: "argument",
  slug: "scope",
  said: "--scope",
  takes: "the scope set, as `global`, `character:<id>` or `companion:<id>`",
  value: "text",
  placeholder: "scope",
} as const satisfies Argument

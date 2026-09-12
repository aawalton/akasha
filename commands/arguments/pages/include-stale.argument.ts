import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const includeStale = {
  id: "01a094d1-276e-7042-a449-305d9d78dd4b",
  type: "argument",
  slug: "include-stale",
  said: "--include-stale",
  takes: "show the entries left behind by an older session too",
  value: "none",
} as const satisfies Argument

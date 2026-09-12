import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const counts = {
  id: "01a094ee-70c6-7543-af9d-9ef4d365ab15",
  type: "argument",
  slug: "counts",
  said: "--counts",
  takes: "how many initiatives and how many intents the tree holds",
  value: "none",
} as const satisfies Argument

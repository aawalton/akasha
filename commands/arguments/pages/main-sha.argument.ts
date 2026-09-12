import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const mainSha = {
  id: "01a094c8-7882-7be9-b0d2-7169c5ecae92",
  type: "argument",
  slug: "main-sha",
  said: "--main-sha",
  takes: "the code-repo commit the cut was taken at",
  value: "text",
  placeholder: "sha",
} as const satisfies Argument

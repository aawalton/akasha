import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const newFact = {
  id: "01a0ea1d-8f1e-71e8-9e3d-a6c901b5ca44",
  type: "page-type/argument",
  slug: "new-fact",
  said: "--new-fact",
  takes: "add the fact to the page where the page holds it nowhere",
  value: "none",
} as const satisfies Argument

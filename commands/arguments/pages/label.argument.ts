import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const label = {
  id: "01a094e6-ba1e-70a9-93b8-8515d2f3e833",
  type: "argument",
  slug: "label",
  said: "--label",
  takes: "a label id a listing is held to, said again for each",
  value: "text",
  placeholder: "id",
  repeats: true,
} as const satisfies Argument

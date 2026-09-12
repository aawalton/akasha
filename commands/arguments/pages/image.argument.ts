import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const image = {
  id: "01a094b9-fec8-7912-a390-96fba7a519bf",
  type: "argument",
  slug: "image",
  said: "--image",
  takes: "the image read in",
  value: "path",
  placeholder: "path",
} as const satisfies Argument

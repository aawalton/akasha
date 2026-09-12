import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const removePath = {
  id: "01a094e3-ec05-7056-9b0d-74fecacfd558",
  type: "argument",
  slug: "remove-path",
  said: "--remove",
  takes: "a file to take away, said from the repository root",
  value: "path",
  placeholder: "path",
} as const satisfies Argument

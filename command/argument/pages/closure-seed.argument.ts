import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const closureSeed = {
  id: "01a0a650-e67a-7402-aee4-46717c59d28d",
  type: "page-type/argument",
  slug: "closure-seed",
  said: "--seed",
  takes: "a file a closure starts from, said from the repository root",
  value: "path",
  placeholder: "seed",
} as const satisfies Argument

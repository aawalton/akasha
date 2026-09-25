import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const glob = {
  id: "01a0d95d-0562-7cc5-b9e3-487f53b25896",
  type: "page-type/argument",
  slug: "glob",
  said: "--glob",
  takes: "a glob a file's path must match, or must not where the glob opens with `!`",
  value: "text",
  placeholder: "glob",
} as const satisfies Argument

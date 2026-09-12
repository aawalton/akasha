import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const contentFile = {
  id: "01a094e4-dbd1-7f1c-83e4-7d9c7c2fc3ba",
  type: "argument",
  slug: "content-file",
  said: "--content-file",
  takes: "the file the body landing at the `--file-path` before it is read from",
  value: "path",
  placeholder: "file",
  repeats: true,
} as const satisfies Argument

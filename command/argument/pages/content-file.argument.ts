import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const contentFile = {
  id: "01a094e4-dbd1-7f1c-83e4-7d9c7c2fc3ba",
  type: "page-type/argument",
  slug: "content-file",
  said: "--content-file",
  takes: "the file the body landing at the `--file-path` before it is read from",
  value: "path",
  placeholder: "file",
} as const satisfies Argument

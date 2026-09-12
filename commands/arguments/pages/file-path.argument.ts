import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const filePath = {
  id: "01a094ba-2be7-705c-a07a-55efaeb8526f",
  type: "argument",
  slug: "file-path",
  said: "--file-path",
  takes: "a file in the repository, said from the repository root",
  value: "path",
  placeholder: "path",
} as const satisfies Argument

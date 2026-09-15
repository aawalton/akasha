import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const download = {
  id: "01a094e7-e785-76b9-ac66-1a902ff40b9d",
  type: "page-type/argument",
  slug: "download",
  said: "--download",
  takes: "the file to fetch the installer ISO to once it is registered",
  value: "path",
  placeholder: "path",
} as const satisfies Argument

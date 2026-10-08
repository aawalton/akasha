import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const download = {
  id: "01a094e7-e785-76b9-ac66-1a902ff40b9d",
  type: "page-type/argument",
  slug: "download",
  said: "--download",
  takes: "the file to fetch the installer ISO to once it is registered",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:17:01.189Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

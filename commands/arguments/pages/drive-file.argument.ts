import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const driveFile = {
  id: "01a094dc-4628-78d1-ae8f-38f7c58ec5d8",
  type: "argument",
  slug: "drive-file",
  said: "--source",
  takes: "the file to fetch, said as a share URL or as a bare id",
  value: "text",
  placeholder: "url-or-id",
} as const satisfies Argument

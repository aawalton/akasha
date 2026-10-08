import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const driveFile = {
  id: "01a094dc-4628-78d1-ae8f-38f7c58ec5d8",
  type: "page-type/argument",
  slug: "drive-file",
  said: "--source",
  takes: "the file to fetch, said as a share URL or as a bare id",
  value: "text",
  placeholder: "url-or-id",
  createdAt: "2026-09-12T09:04:18.984Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

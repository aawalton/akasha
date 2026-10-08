import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const noUpload = {
  id: "01a094ff-fd4f-7303-83f9-cbdfc9bf71b8",
  type: "page-type/argument",
  slug: "no-upload",
  said: "--no-upload",
  takes: "build and validate an ios app without uploading it",
  value: "none",
  createdAt: "2026-09-12T09:43:19.631Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

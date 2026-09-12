import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const noUpload = {
  id: "01a094ff-fd4f-7303-83f9-cbdfc9bf71b8",
  type: "argument",
  slug: "no-upload",
  said: "--no-upload",
  takes: "build and validate an ios app without uploading it",
  value: "none",
} as const satisfies Argument

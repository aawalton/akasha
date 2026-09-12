import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const framesDir = {
  id: "01a09483-f5a5-7993-a623-00cbad04c631",
  type: "argument",
  slug: "frames-dir",
  said: "--frames-dir",
  takes: "the directory of frames read",
  value: "path",
  placeholder: "dir",
} as const satisfies Argument

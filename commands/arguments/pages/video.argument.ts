import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const video = {
  id: "01a09483-e0b0-7f37-b9c8-a1736711d61d",
  type: "argument",
  slug: "video",
  said: "--video",
  takes: "the clip read, whose frames are taken here",
  value: "path",
  placeholder: "path",
} as const satisfies Argument

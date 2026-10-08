import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const video = {
  id: "01a09483-e0b0-7f37-b9c8-a1736711d61d",
  type: "page-type/argument",
  slug: "video",
  said: "--video",
  takes: "the clip read, whose frames are taken here",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T07:27:45.840Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const pictureSubject = {
  id: "01a0ca64-dae7-7da4-b2ea-0521e5282c32",
  type: "page-type/argument",
  slug: "picture-subject",
  said: "--window",
  takes: "the window to draw, named by the slug the harness lists it under",
  value: "text",
  placeholder: "window",
} as const satisfies Argument

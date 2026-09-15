import type { Argument } from "akasha/command/arguments/argument.page-type.types.ts"

export const picture = {
  id: "01a09c65-49bb-7e4d-accd-f0895993a21e",
  type: "argument",
  slug: "picture",
  said: "--picture",
  takes: "the picture to bring, named by the id the picture was kept under",
  value: "text",
  placeholder: "uuid",
} as const satisfies Argument

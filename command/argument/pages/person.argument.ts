import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const person = {
  id: "01a16feb-b244-706c-a5f2-fb954ae5ab84",
  type: "page-type/argument",
  slug: "person",
  said: "--person",
  takes: "who the browser is signed in as, `alan` where none is said",
  value: "text",
  placeholder: "slug",
  default: "alan",
  createdAt: "2026-10-24T21:58:00.003Z",
  updatedAt: "2026-10-24T21:58:00.003Z",
} as const satisfies Argument

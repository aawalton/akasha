import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const cloneAs = {
  id: "01a17f32-5bc4-77f9-98a9-2db6aaeac116",
  type: "page-type/argument",
  slug: "clone-as",
  said: "--as",
  takes: "the slug a clone is made under",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-10-27T21:09:29.155Z",
  updatedAt: "2026-10-27T21:09:29.155Z",
} as const satisfies Argument

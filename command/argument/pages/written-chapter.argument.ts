import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const writtenChapter = {
  id: "01a0e96b-42b5-72bc-967f-f9cb121180fe",
  type: "page-type/argument",
  slug: "written-chapter",
  said: "--chapter",
  takes: "the chapter being made or pictured, named by its address",
  value: "text",
  placeholder: "address",
  createdAt: "2026-09-28T19:08:35.893Z",
  updatedAt: "2026-10-09T01:02:54.341Z",
} as const satisfies Argument

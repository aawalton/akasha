import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const writtenChapter = {
  id: "01a0e96b-42b5-72bc-967f-f9cb121180fe",
  type: "page-type/argument",
  slug: "written-chapter",
  said: "--chapter",
  takes: "the written chapter being made, named by its address",
  value: "text",
  placeholder: "address",
} as const satisfies Argument

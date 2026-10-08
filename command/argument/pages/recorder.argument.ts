import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const recorder = {
  id: "01a0e05a-ba5d-7788-b127-428d0fb97315",
  type: "page-type/argument",
  slug: "recorder",
  said: "--recorder",
  takes: "the story recorder whose drafted edits are done",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-27T00:53:57.469Z",
  updatedAt: "2026-09-27T00:54:01.000Z",
} as const satisfies Argument

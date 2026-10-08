import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const picture = {
  id: "01a09c65-49bb-7e4d-accd-f0895993a21e",
  type: "page-type/argument",
  slug: "picture",
  said: "--picture",
  takes: "the picture to bring, named by its image page's slug",
  value: "text",
  placeholder: "image-…",
  createdAt: "2026-09-13T20:11:18.843Z",
  updatedAt: "2026-09-21T22:31:33.000Z",
} as const satisfies Argument

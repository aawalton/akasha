import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const image = {
  id: "01a094b9-fec8-7912-a390-96fba7a519bf",
  type: "page-type/argument",
  slug: "image",
  said: "--image",
  takes: "the image read in",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:26:52.488Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

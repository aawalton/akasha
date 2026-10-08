import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const startImage = {
  id: "01a094d4-3536-7aff-9a39-8bee6d7fdb67",
  type: "page-type/argument",
  slug: "start-image",
  said: "--start-image",
  takes: "the first frame the clip is conditioned on",
  value: "path",
  placeholder: "png",
  createdAt: "2026-09-12T08:55:30.358Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const endImage = {
  id: "01a094d4-49e3-7131-b7cb-4a70711ed333",
  type: "page-type/argument",
  slug: "end-image",
  said: "--end-image",
  takes: "the last frame the clip is conditioned on",
  value: "path",
  placeholder: "png",
  createdAt: "2026-09-12T08:55:35.651Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument

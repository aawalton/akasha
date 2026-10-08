import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const rembgSession = {
  id: "01a09506-6bd7-7fd0-9a35-1080466bbab0",
  type: "page-type/argument",
  slug: "rembg-session",
  said: "--model",
  takes: "the rembg session the matte is cut with",
  value: "text",
  placeholder: "name",
  default: "birefnet-portrait",
  createdAt: "2026-09-12T09:50:21.143Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument

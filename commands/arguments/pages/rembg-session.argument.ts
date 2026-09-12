import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const rembgSession = {
  id: "01a09506-6bd7-7fd0-9a35-1080466bbab0",
  type: "argument",
  slug: "rembg-session",
  said: "--model",
  takes: "the rembg session the matte is cut with",
  value: "text",
  placeholder: "name",
  default: "birefnet-portrait",
} as const satisfies Argument

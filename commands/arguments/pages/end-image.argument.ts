import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const endImage = {
  id: "01a094d4-49e3-7131-b7cb-4a70711ed333",
  type: "argument",
  slug: "end-image",
  said: "--end-image",
  takes: "the last frame the clip is conditioned on",
  value: "path",
  placeholder: "png",
} as const satisfies Argument

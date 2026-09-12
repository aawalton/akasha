import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const refAudio = {
  id: "01a094d7-3417-7b35-bfc5-a3834962c4d0",
  type: "argument",
  slug: "ref-audio",
  said: "--ref-audio",
  takes: "the clip the voice is taken from",
  value: "path",
  placeholder: "path.wav",
} as const satisfies Argument

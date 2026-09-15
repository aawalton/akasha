import type { Argument } from "akasha/command/arguments/argument.page-type.types.ts"

export const play = {
  id: "01a0a02c-92a8-791e-afac-5a8d5aed051e",
  type: "argument",
  slug: "play",
  said: "--play",
  takes: "start the device moved to rather than leaving it as it was",
  value: "none",
} as const satisfies Argument

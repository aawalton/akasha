import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const full = {
  id: "01a09510-464d-7116-ad57-b21b89ff2e25",
  type: "argument",
  slug: "full",
  said: "--full",
  takes: "the whole body, whatever your record holds",
  value: "none",
} as const satisfies Argument

import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const alphaMatting = {
  id: "01a0950e-47c2-794c-87e2-2ec3480b0c9a",
  type: "argument",
  slug: "alpha-matting",
  said: "--alpha-matting",
  takes: "refine the matte's edges, which costs more",
  value: "none",
} as const satisfies Argument

import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const windowDuration = {
  id: "01a069e8-c315-7c16-b624-a471a8e9cdec",
  type: "module",
  slug: "window-duration",
  definition: "a span of time a caller writes as a count and a unit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A span reaches the caller as a count of milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A span written in any other shape raises an input error naming the flag.",
    },
  ],
} as const satisfies Module

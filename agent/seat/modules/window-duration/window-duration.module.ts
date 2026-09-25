import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowDuration = {
  id: "01a069e8-c315-7c16-b624-a471a8e9cdec",
  type: "page-type/module",
  slug: "window-duration",
  definition: "how code reads a time from a number and a unit",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A span reaches the caller as a count of milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A span written in any other shape raises an input error naming the flag.",
    },
  ],
} as const satisfies Module

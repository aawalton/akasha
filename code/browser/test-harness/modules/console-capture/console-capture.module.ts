import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const consoleCapture = {
  id: "01a05ca9-d802-7e8d-8a1c-61187202e954",
  type: "page-type/module",
  slug: "console-capture",
  definition:
    "what the browser wrote to its console and threw, kept for a run and dumped on demand",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A capture has a bounded number of entries and counts the entries the capture dropped.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const consoleCapture = {
  id: "01a05ca9-d802-7e8d-8a1c-61187202e954",
  pageTypeSlug: "module",
  slug: "console-capture",
  definition:
    "what the browser wrote to its console and threw, kept for a run and dumped on demand",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capture holds a bounded number of entries and counts what the capture dropped.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code/module"

export const consoleCapture = {
  id: "01a05ca9-d802-7e8d-8a1c-61187202e954",
  pageTypeSlug: "module",
  type: "module",
  slug: "console-capture",
  definition:
    "what the browser wrote to its console and threw, kept for a run and dumped on demand",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A capture has a bounded number of entries and counts the entries the capture dropped.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readOnlyHarness = {
  id: "01a05ca9-d803-7362-b933-e54ad04b2b64",
  type: "page-type/module",
  slug: "read-only-harness",
  definition: "a browser session opened as nobody, and so one that only ever reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here signs anybody in.",
    },
  ],
  createdAt: "2026-09-01T11:10:29.891Z",
  updatedAt: "2026-09-21T00:55:02.000Z",
} as const satisfies Module

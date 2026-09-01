import type { Module } from "../../code-system/module/module.page-type.ts"

export const traceRows = {
  id: "01a05bc7-9129-700c-b6ff-1e1d1f2b0587",
  pageTypeSlug: "module",
  slug: "trace-rows",
  definition: "a recorded place written out as a stored row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What names a trace is the phone it came from with the count that phone gave it.",
    },
    {
      invariantKind: "departure",
      statement: "A field left unsaid is left out of the row rather than written as empty.",
    },
  ],
} as const satisfies Module

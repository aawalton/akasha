import type { Module } from "@akasha/code-system/module"

export const triageFanoutRender = {
  id: "01a06885-0bab-7005-95ff-5a77f835d7e3",
  pageTypeSlug: "module",
  slug: "triage-fanout-render",
  definition: "what a fan-out log's verdict says when it is written out for a person to read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A declined line says why it is declined and what to do instead of naming an owner.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict that passed states its coverage and nothing about failures.",
    },
    {
      invariantKind: "departure",
      statement: "A failure over a log with no clean terminal asks for the whole log again.",
    },
  ],
} as const satisfies Module

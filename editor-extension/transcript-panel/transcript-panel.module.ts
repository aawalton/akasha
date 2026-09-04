import type { Module } from "../../code-system/modules/module.page-type.ts"

export const transcriptPanel = {
  id: "01a06811-01d3-7004-8ef9-96ac6599463f",
  pageTypeSlug: "module",
  slug: "transcript-panel",
  definition: "the command that opens a seat's transcript, and the seat it asks Alan to pick",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One command opens a transcript.",
    },
    {
      invariantKind: "departure",
      statement: "A command given no seat and no path asks Alan to pick one.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat whose transcript file stands is offered.",
    },
    {
      invariantKind: "departure",
      statement: "The seats are offered with the most lately written first.",
    },
    {
      invariantKind: "departure",
      statement: "A machine holding no seat transcript is told so rather than shown a list.",
    },
  ],
} as const satisfies Module

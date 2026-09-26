import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const strikeResolution = {
  id: "01a0de82-ec49-7228-a137-9e9f1a4de0d8",
  type: "page-type/module",
  slug: "strike-resolution",
  definition: "whether a strike lands, which band it lands in, and the damage it deals",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story whose strikes resolve this way reaches this one module.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which story's strike is resolving.",
    },
  ],
} as const satisfies Module

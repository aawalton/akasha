import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferEndpoint = {
  id: "01a05b55-e06e-7111-b593-e60ae5994db1",
  type: "page-type/module",
  slug: "infer-endpoint",
  definition: "where the voice model answers when nothing else names it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The address is the address the cluster gives the service inside itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming its own address uses that address instead.",
    },
  ],
} as const satisfies Module

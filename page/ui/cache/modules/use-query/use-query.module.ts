import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useQuery = {
  id: "01a05cce-25ec-7536-86c6-340adc946098",
  type: "page-type/module",
  slug: "use-query",
  definition: "the pages a listing asks for, held live against the local store",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing shows no row until its own question has been answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing answered before shows the rows it last held while it is read again.",
    },
  ],
} as const satisfies Module

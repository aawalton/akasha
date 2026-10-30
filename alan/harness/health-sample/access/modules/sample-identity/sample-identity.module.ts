import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sampleIdentity = {
  id: "01a05bc7-9129-7002-ab78-700980114edd",
  type: "page-type/module",
  slug: "sample-identity",
  definition: "the identity of a health sample",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading's identity is its metric with its source and the span the reading covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two instants spelled differently for the same moment match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant that will not parse throws rather than counting as nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The value read is no part of a reading's identity.",
    },
  ],
  createdAt: "2026-09-01T07:03:20.617Z",
  updatedAt: "2026-10-30T15:29:15.197Z",
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const locationIngestContext = {
  id: "01a06582-6b30-7b6f-93b3-2403a3c2ade4",
  type: "page-type/module",
  slug: "location-ingest-context",
  definition: "whether a location ingest carries a reader atlas knows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ingest is admitted on atlas's own handover cookie and on nothing else.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No bearer token admits an ingest.",
    },
  ],
} as const satisfies Module

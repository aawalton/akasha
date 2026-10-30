import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const locationIngestContext = {
  id: "01a06582-6b30-7b6f-93b3-2403a3c2ade4",
  type: "page-type/module",
  slug: "location-ingest-context",
  definition: "whether a request that sends locations has a person the website knows",
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
  createdAt: "2026-09-03T04:24:01.072Z",
  updatedAt: "2026-10-30T14:50:12.191Z",
} as const satisfies Module

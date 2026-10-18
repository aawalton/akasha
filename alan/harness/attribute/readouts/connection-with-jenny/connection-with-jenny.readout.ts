import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const connectionWithJenny = {
  id: "01a13584-9f8b-76ab-9b23-bb7c8a172972",
  type: "page-type/readout",
  slug: "connection-with-jenny",
  definition: "the points Alan earned on a day for the hours with Jenny that cost him nothing",
  label: "Connection",
  unit: "points",
  scale: "readout-scale/attribute-points",
  relationship: "relationship/jennifer-walton",
  groups: [{ group: "readout-group/connection", place: 1 }],
  wireKey: "connection",
  servedBy: ["module/attributes-reading", "service-workstation/attributes-relay-service"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The reading is the charisma of today's stretches naming the relationship linked here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch naming Jenny among others counts toward the reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is colored on the scale the charisma is colored on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day no stretch can be read on is no reading rather than a zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This readout counts no attribute.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
  ],
  carriedTo: ["router-app/smilingjenny-web"],
  madeFrom: "day-row-and-stretches",
  createdAt: "2026-10-13T13:47:26.474Z",
  updatedAt: "2026-10-18T13:28:15.838Z",
} as const satisfies Readout

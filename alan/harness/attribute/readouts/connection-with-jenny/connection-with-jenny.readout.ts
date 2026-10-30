import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const connectionWithJenny = {
  id: "01a13584-9f8b-76ab-9b23-bb7c8a172972",
  type: "page-type/readout",
  slug: "connection-with-jenny",
  definition: "the hours of a day Alan spends with Jenny",
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
        "The number this readout shows is the hours of today's stretches naming the relationship linked here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch naming Jenny among others counts toward the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is colored on the scale the charisma is colored on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no stretch stating both its times yet reads zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This readout counts no attribute.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
  ],
  carriedTo: ["router-app/smilingjenny-web"],
  madeFrom: "day-row-and-stretches",
  createdAt: "2026-10-13T13:47:26.474Z",
  updatedAt: "2026-10-30T17:12:46.964Z",
} as const satisfies Readout

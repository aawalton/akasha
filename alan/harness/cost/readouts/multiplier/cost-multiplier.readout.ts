import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const costMultiplier = {
  id: "01a08b9c-6412-7e0f-8a4e-fc4a180594e6",
  type: "page-type/readout",
  slug: "cost-multiplier",
  definition: "the cost of an hour of Alan's current block",
  reading: {},
  label: "Cost",
  colorFrom: "readout/upkeep-surplus",
  groups: [{ group: "readout-group/cost", place: 1 }],
  wireKey: "cost",
  servedBy: ["module/cost-reading", "service-workstation/cost-relay-service"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The number this readout shows now is the multiplier the open block is priced at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The multiplier is read from the gap between the block's safety and difficulty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block a full level inside the safety level reads zero rather than no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No open block is no number rather than a cost of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An open block missing either level is no number rather than a cost of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level given as text is read as the number that text spells.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This readout names no scale.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a cost into a color.",
    },
  ],
  carriedTo: ["router-app/alan-web", "router-app/smilingjenny-web"],
  madeFrom: "open-block",
  createdAt: "2026-09-10T13:57:57.394Z",
  updatedAt: "2026-10-30T17:17:55.119Z",
} as const satisfies Readout

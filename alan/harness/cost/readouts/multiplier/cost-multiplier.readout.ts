import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const costMultiplier = {
  id: "01a08b9c-6412-7e0f-8a4e-fc4a180594e6",
  type: "page-type/readout",
  slug: "cost-multiplier",
  definition: "what an hour of the block Alan is in costs him",
  reading: {},
  label: "Cost",
  place: 1,
  colorFrom: "readout/upkeep-surplus",
  groups: ["readout-group/cost"],
  wireKey: "cost",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading now is the multiplier the open block is priced at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The multiplier is read from the gap between the block's safety and difficulty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block a full level inside the safety level reads zero rather than no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No open block is no reading rather than a cost of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An open block missing either level is no reading rather than a cost of zero.",
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
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a cost into a color.",
    },
  ],
  carriedTo: ["router-app/alan-web", "router-app/smilingjenny-web"],
} as const satisfies Readout

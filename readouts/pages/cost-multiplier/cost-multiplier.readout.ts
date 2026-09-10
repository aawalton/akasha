import type { Readout } from "../../readout.page-type.types.ts"

export const costMultiplier = {
  id: "01a08b9c-6412-7e0f-8a4e-fc4a180594e6",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "cost-multiplier",
  definition: "what an hour of the block Alan is in costs him",
  code: "ts",
  test: "ts",
  label: "Cost",
  place: 1,
  groups: ["cost"],
  wireKey: "cost",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading now is the multiplier the open block is priced at.",
    },
    {
      invariantKind: "departure",
      statement: "The multiplier is read from the gap between the block's safety and difficulty.",
    },
    {
      invariantKind: "departure",
      statement: "A block a full level inside the safety level reads zero rather than no reading.",
    },
    {
      invariantKind: "departure",
      statement: "No open block is no reading rather than a cost of zero.",
    },
    {
      invariantKind: "departure",
      statement: "An open block missing either level is no reading rather than a cost of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A level given as text is read as the number that text spells.",
    },
    {
      invariantKind: "absence",
      statement: "This readout names no scale, because its color is read with the surplus.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a cost into a color.",
    },
  ],
} as const satisfies Readout

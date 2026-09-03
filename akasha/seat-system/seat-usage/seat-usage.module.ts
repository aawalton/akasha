import type { Module } from "@akasha/code-system/module"

export const seatUsage = {
  id: "01a0687b-3c96-7000-be32-deed725bb134",
  pageTypeSlug: "module",
  slug: "seat-usage",
  definition: "the model a seat is on and how much of its context window is spent",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading is taken from what the statusline payload states and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A number the payload states is kept as the text of that number.",
    },
    {
      invariantKind: "departure",
      statement: "A value the payload does not state is not written over what stands.",
    },
    {
      invariantKind: "departure",
      statement: "An empty string is no reading.",
    },
  ],
} as const satisfies Module

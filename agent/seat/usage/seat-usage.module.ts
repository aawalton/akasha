import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatUsage = {
  id: "01a0687b-3c96-7000-be32-deed725bb134",
  type: "module",
  slug: "seat-usage",
  definition: "what a seat spends while an agent works in it",
  parts: ["module/seat-usage-keep", "module/seat-usage-show", "module/typing-minutes"],
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reading is taken from the values the statusline payload states and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A number the payload states is kept as the text of that number.",
    },
    {
      invariantKind: "departure",
      statement: "A value the payload does not state is not written over the value that stands.",
    },
    {
      invariantKind: "departure",
      statement: "An empty string is no reading.",
    },
  ],
} as const satisfies Module

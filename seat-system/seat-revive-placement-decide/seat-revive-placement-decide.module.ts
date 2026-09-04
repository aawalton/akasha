import type { Module } from "@akasha/code-system/module"

export const seatRevivePlacementDecide = {
  id: "01a0686d-9d5e-700c-bfab-34cefcdacc41",
  pageTypeSlug: "module",
  slug: "seat-revive-placement-decide",
  definition: "whether a seat comes back up where it was standing or comes back headless",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat restarts in place only where its prior launch opened a terminal and that terminal is still live.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with nowhere standing to go back to comes back headless.",
    },
  ],
} as const satisfies Module

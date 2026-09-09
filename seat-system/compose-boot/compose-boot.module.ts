import type { Module } from "@akasha/code/module"

export const composeBoot = {
  id: "01a069c8-f654-7765-bacf-c9f586d7aa13",
  pageTypeSlug: "module",
  type: "module",
  slug: "compose-boot",
  definition:
    "a seat's system prompt: who it is, and the one read that loads everything it is bound to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A composition states who the seat is and instructs the read that loads the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose attributes state nothing is told so and is told to read.",
    },
    {
      invariantKind: "absence",
      statement: "A composition has no path.",
    },
  ],
} as const satisfies Module

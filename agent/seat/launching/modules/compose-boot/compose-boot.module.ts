import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeBoot = {
  id: "01a069c8-f654-7765-bacf-c9f586d7aa13",
  type: "page-type/module",
  slug: "compose-boot",
  definition: "how code writes the message a new seat reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A composition states who the seat is and instructs the read that loads the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose attributes state nothing is told so and is told to read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A composition has no path.",
    },
  ],
  createdAt: "2026-09-04T00:19:33.076Z",
  updatedAt: "2026-09-25T18:00:20.000Z",
} as const satisfies Module

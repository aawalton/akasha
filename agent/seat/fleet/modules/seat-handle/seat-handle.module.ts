import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatHandle = {
  id: "01a06983-278f-73b4-b978-513711cc100d",
  type: "page-type/module",
  slug: "seat-handle",
  definition: "how code finds a seat from its name or a part of its id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A handle reaching no seat, or more than one, is refused as a fault of the call.",
    },
  ],
  createdAt: "2026-09-03T23:03:18.159Z",
  updatedAt: "2026-09-25T17:57:44.000Z",
} as const satisfies Module

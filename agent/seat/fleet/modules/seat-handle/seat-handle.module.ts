import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatHandle = {
  id: "01a06983-278f-73b4-b978-513711cc100d",
  type: "page-type/module",
  slug: "seat-handle",
  definition: "the grammar of a uuid, a prefix, or a name that names a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A handle reaching no seat, or more than one, is refused as a fault of the call.",
    },
  ],
} as const satisfies Module

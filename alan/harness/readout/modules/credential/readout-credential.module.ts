import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutCredential = {
  id: "01a054d9-d41f-796f-a2ff-b2c0fa9863a0",
  type: "page-type/module",
  slug: "readout-credential",
  definition: "what a readout route admits a caller on",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One guard answers for every route serving a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A secret is compared in constant time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names no reason.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A secret that is unset or empty admits nobody.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a person or a device.",
    },
  ],
} as const satisfies Module

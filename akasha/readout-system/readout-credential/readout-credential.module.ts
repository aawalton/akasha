import type { Module } from "../../code-system/module/module.page-type.ts"

export const readoutCredential = {
  id: "01a054d9-d41f-796f-a2ff-b2c0fa9863a0",
  pageTypeSlug: "module",
  slug: "readout-credential",
  definition: "what a readout route admits a caller on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One guard answers for every route serving a reading.",
    },
    {
      invariantKind: "departure",
      statement: "A secret is compared in constant time.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names no reason.",
    },
    {
      invariantKind: "constraint",
      statement: "A secret that is unset or empty admits nobody.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a person or a device.",
    },
  ],
} as const satisfies Module

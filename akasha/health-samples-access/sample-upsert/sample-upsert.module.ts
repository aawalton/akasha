import type { Module } from "../../code-system/module/module.page-type.ts"

export const sampleUpsert = {
  id: "01a05bc7-9129-7006-bbd4-12ab615a3223",
  pageTypeSlug: "module",
  slug: "sample-upsert",
  definition: "health readings landed on the ESO day each began in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two readings carried in under one name land as the later of the two.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that already stood keeps the row the reading stood in.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that already stood keeps the arrival the reading had.",
    },
    {
      invariantKind: "departure",
      statement: "A day no page stands for is written before its readings land.",
    },
    {
      invariantKind: "departure",
      statement: "What was written is reported as counts rather than as the readings themselves.",
    },
  ],
} as const satisfies Module

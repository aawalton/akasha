import type { Module } from "@akasha/code-system/module"

export const nextBossState = {
  id: "01a06157-8356-706b-948b-6f8dae0434bf",
  pageTypeSlug: "module",
  slug: "next-boss-state",
  definition: "the one table every part of this tracker reads and writes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One table holds what this tracker keeps.",
    },
    {
      invariantKind: "departure",
      statement: "The table is declared whole and filled in by the modules that own each part.",
    },
    {
      invariantKind: "stopgap",
      statement: "The table is cast rather than built.",
    },
  ],
} as const satisfies Module

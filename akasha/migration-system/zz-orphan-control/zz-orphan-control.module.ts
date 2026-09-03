import type { Module } from "@akasha/code-system/module"

export const zzOrphanControl = {
  id: "01a06986-b97b-7f2c-96fc-8321c83a1c4b",
  pageTypeSlug: "module",
  slug: "zz-orphan-control",
  definition:
    "a seeded page standing under no parent, landed so a census zero has something to find",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This page is taken away as soon as the census answers.",
    },
  ],
} as const satisfies Module

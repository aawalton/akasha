import type { Module } from "@akasha/code-system/module"

export const leadsUndaunted = {
  id: "01a06274-b08a-740f-a9ca-6ce4d4c10ef1",
  pageTypeSlug: "module",
  slug: "leads-undaunted",
  definition: "the undaunted pledge dungeons set for today",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pledge tracker is optional and its absence is not an error.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const statusBarLegends = {
  id: "01a0655b-ae42-7398-bbea-589a74f1d120",
  pageTypeSlug: "module",
  slug: "status-bar-legends",
  definition: "the labels a stoplight section's tooltip names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every stoplight section is here whether or not the section has been read.",
    },
    {
      invariantKind: "departure",
      statement: "A section that has not been read names no labels.",
    },
    {
      invariantKind: "departure",
      statement: "A section whose read failed keeps the labels the section last named.",
    },
    {
      invariantKind: "departure",
      statement: "The labels and the glyphs beside the labels come out of one reading of a group.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches a label.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here schedules or times out a read.",
    },
  ],
} as const satisfies Module

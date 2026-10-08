import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonDistBundles = {
  id: "01a06365-e827-7001-8799-62e2c6d7ba62",
  type: "page-type/module",
  slug: "addon-dist-bundles",
  definition: "the emitted Lua bundles a post-build gate has to examine",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A build output that is no directory is an empty population rather than an error.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A gate finding no bundle refuses rather than certifying the add-ons clean.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The refusal names the build command that would fill the population.",
    },
  ],
  createdAt: "2026-09-02T18:33:38.087Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module

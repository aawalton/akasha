import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const deployedRenderCheck = {
  id: "01a05ca9-d802-795d-ac6f-ca68611372b6",
  type: "module",
  slug: "deployed-render-check",
  definition:
    "whether a rendered page passed, failed or could not be told apart from an empty shell",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A render nothing discriminating was asserted over fails.",
    },
    {
      invariantKind: "departure",
      statement: "A settle that timed out turns a failure into an indeterminate.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const ciDispatchShapes = {
  id: "01a06861-24c9-7000-96ff-317d9cb6fe33",
  pageTypeSlug: "module",
  slug: "ci-dispatch-shapes",
  definition: "the shapes a dispatch decision is written in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step stating no resource requests asks for 100 millicores and 512 mebibytes.",
    },
  ],
} as const satisfies Module

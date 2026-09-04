import type { Module } from "@akasha/code-system/module"

export const shapeProgress = {
  id: "01a05cb3-7cca-71ff-970d-6e0340c8a4ce",
  pageTypeSlug: "module",
  slug: "shape-progress",
  definition: "how far a folder shape has got from stated to coded to enforced",
  code: "ts",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "Every shape answers stated.",
    },
    {
      invariantKind: "gap",
      statement: "A shape answers what its own page says the shape has got to.",
    },
  ],
} as const satisfies Module

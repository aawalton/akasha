import type { Module } from "@akasha/code-system/module"

export const shapeLoading = {
  id: "01a06328-b8b6-750e-9c26-741059f3c69f",
  pageTypeSlug: "module",
  slug: "shape-loading",
  definition: "the folder shapes the index names, each loaded from the code beside its page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The shapes are found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "A shape judging no folder is never loaded.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape's code is loaded from the body on disk rather than from where the change leaves the code.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change writing a shape's code anew is refused rather than judged by the body before the change.",
    },
    {
      invariantKind: "departure",
      statement: "The shapes are handed over ordered by slug.",
    },
  ],
} as const satisfies Module

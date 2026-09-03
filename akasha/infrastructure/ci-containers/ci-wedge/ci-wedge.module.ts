import type { Module } from "@akasha/code-system/module"

export const ciWedge = {
  id: "01a06861-24c9-7014-8e58-52d1f185ea75",
  pageTypeSlug: "module",
  slug: "ci-wedge",
  definition: "failing a step that runs on burning no cpu and writing no log",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step is judged wedged only where it burns no cpu and its log has stood still.",
    },
    {
      invariantKind: "departure",
      statement: "A step no cpu reading is held for is not judged wedged.",
    },
    {
      invariantKind: "departure",
      statement: "A step is weighed for a wedge only once it has run long enough to judge.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const libSetsTipRender = {
  id: "01a0623c-2df6-77cd-8544-af3c2c7c7dc5",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-render",
  definition: "the set line added to a tooltip control and the check that an item warrants one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A gamepad tooltip gets its own section with a LibSets heading.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing is added when the built text comes back empty.",
    },
  ],
} as const satisfies Module

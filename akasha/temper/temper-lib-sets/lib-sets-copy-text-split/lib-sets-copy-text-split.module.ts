import type { Module } from "@akasha/code-system/module"

export const libSetsCopyTextSplit = {
  id: "01a0623c-2df8-7447-8782-334bfe087f89",
  pageTypeSlug: "module",
  slug: "lib-sets-copy-text-split",
  definition: "cutting a string into fixed-length chunks without breaking a multi-byte character",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The cut point is nudged forward when the cut point lands inside a multi-byte character.",
    },
  ],
} as const satisfies Module

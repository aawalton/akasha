import type { Module } from "@akasha/code-system/module"

export const companionsSelector = {
  id: "01a0611d-84e2-7e9e-843a-d527c9bc4f3c",
  pageTypeSlug: "module",
  slug: "companions-selector",
  definition: "the dropdown choosing which companion every panel is showing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The chosen companion is kept between sessions.",
    },
  ],
} as const satisfies Module

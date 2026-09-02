import type { Module } from "@akasha/code-system/module"

export const housingInit = {
  id: "01a06129-7a21-7e7a-a425-6b5004f48456",
  pageTypeSlug: "module",
  slug: "housing-init",
  definition: "opening saved variables and building the housing window as the add-on loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The window is built as the add-on loads rather than when first shown.",
    },
    {
      invariantKind: "departure",
      statement: "Saved variables missing a field take the field's default.",
    },
  ],
} as const satisfies Module

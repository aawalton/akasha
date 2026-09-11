import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const unpackColor = {
  id: "01a090aa-4938-7f89-a924-2a3c86c77dd2",
  pageTypeSlug: "module",
  type: "module",
  slug: "unpack-color",
  definition: "a color's four numbers handed back as four separate values",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A red, green or blue the color is missing is handed back as full.",
    },
    {
      invariantKind: "departure",
      statement: "An alpha the color is missing is handed back as nothing.",
    },
  ],
} as const satisfies Module

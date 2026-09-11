import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const importRedirect = {
  id: "01a09097-3491-7938-9cab-3a376e69de9f",
  type: "module",
  slug: "import-redirect",
  definition: "where a browser is sent after a shared build hash was imported for that browser",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A redirect carries every cookie the import set.",
    },
    {
      invariantKind: "departure",
      statement: "A redirect is found again rather than moved for good.",
    },
    {
      invariantKind: "absence",
      statement: "A redirect has no body.",
    },
  ],
} as const satisfies Module

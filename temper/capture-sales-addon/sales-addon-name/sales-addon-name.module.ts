import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const salesAddonName = {
  id: "01a060e2-3181-7b51-b345-f0965034e14a",
  type: "module",
  slug: "sales-addon-name",
  definition: "the name the sales add-on is known by to the game",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Module

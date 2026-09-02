import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const equipmentSignatureCompiler = {
  id: "01a06276-e3e7-73dc-b7c5-e02a70f1c789",
  pageTypeSlug: "module",
  slug: "equipment-signature-compiler",
  definition: "a build's wanted gear written as the numbers the game states items by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slot carrying no trait yields no signature.",
    },
    {
      invariantKind: "departure",
      statement: "A shield is read as an off-hand carrying an armor trait.",
    },
    {
      invariantKind: "departure",
      statement: "A two-handed main hand leaves the off-hand unread.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const listUnsubscribe = {
  id: "01a05c0e-3731-779e-88f2-ee109ff37a60",
  pageTypeSlug: "module",
  slug: "list-unsubscribe",
  definition: "getting off a mailing list by the headers the mail carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One-click is used only where the sender says it is offered.",
    },
    {
      invariantKind: "departure",
      statement: "A mailto is fallen back to where one-click is not offered.",
    },
    {
      invariantKind: "departure",
      statement: "A one-click POST that does not succeed is refused rather than passed over.",
    },
  ],
} as const satisfies Module

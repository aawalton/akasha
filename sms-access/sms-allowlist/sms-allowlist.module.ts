import type { Module } from "../../code-system/modules/module.page-type.ts"

export const smsAllowlist = {
  id: "01a05b73-2ec7-7c96-a18b-ac0ec2a858e9",
  pageTypeSlug: "module",
  slug: "sms-allowlist",
  definition: "who may send us an SMS, read from the relationship pages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module raises rather than answering that nobody may send.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page type nothing answers for.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says where those pages sit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "A relationship is a page akasha carries.",
    },
  ],
} as const satisfies Module

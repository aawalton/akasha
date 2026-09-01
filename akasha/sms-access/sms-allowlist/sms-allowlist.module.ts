import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement: "A relationship row that will not parse is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A store that cannot answer throws rather than reading as nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A sending permission spelt as a word is read as the boolean it names.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../code-system/modules/module.page-type.ts"

export const contactsDb = {
  id: "01a05bc9-4308-7003-8ead-78b2057545e5",
  pageTypeSlug: "module",
  slug: "contacts-db",
  definition: "names and the numbers and addresses they answer at, read from the address book",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phone number is matched by its last ten digits.",
    },
    {
      invariantKind: "departure",
      statement: "An address is matched lower-cased and whole.",
    },
    {
      invariantKind: "departure",
      statement: "One person standing in several address book sources is merged into one contact.",
    },
    {
      invariantKind: "departure",
      statement: "A record carrying no name is passed over.",
    },
  ],
} as const satisfies Module

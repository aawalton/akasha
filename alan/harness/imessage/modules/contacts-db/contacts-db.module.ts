import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const contactsDb = {
  id: "01a05bc9-4308-7003-8ead-78b2057545e5",
  type: "page-type/module",
  slug: "contacts-db",
  definition: "names and the numbers and addresses they answer at, read from the address book",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A phone number is matched by its last ten digits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address is matched lower-cased and whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One person held in several address book sources is merged into one contact.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record with no name is passed over.",
    },
  ],
} as const satisfies Module

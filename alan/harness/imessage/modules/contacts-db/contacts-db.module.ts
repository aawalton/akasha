import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const contactsDb = {
  id: "01a05bc9-4308-7003-8ead-78b2057545e5",
  type: "page-type/module",
  slug: "contacts-db",
  definition:
    "how code reads the phone numbers and email addresses the address book has for each name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phone number is matched by its last ten digits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is matched lower-cased and whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One person held in several address book sources is merged into one contact.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record with no name is passed over.",
    },
  ],
  createdAt: "2026-09-01T07:05:11.688Z",
  updatedAt: "2026-10-30T15:30:53.759Z",
} as const satisfies Module

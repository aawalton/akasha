import type { Module } from "../../code-system/modules/module.page-type.ts"

export const imessageRemote = {
  id: "01a05bc9-4308-7005-8e21-1d68ebecb94c",
  pageTypeSlug: "module",
  slug: "imessage-remote",
  definition: "message and contact reads carried to the machine holding them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is resolved through the address book before any handle is matched.",
    },
    {
      invariantKind: "departure",
      statement: "A name matching nobody is a data failure rather than an empty answer.",
    },
    {
      invariantKind: "departure",
      statement: "An address or a number is matched against handles without the address book.",
    },
  ],
} as const satisfies Module

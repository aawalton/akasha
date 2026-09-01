import type { Module } from "../../code-system/module/module.page-type.ts"

export const imessageSsh = {
  id: "01a05bc9-4308-7000-a78a-6c8f2ed447e8",
  pageTypeSlug: "module",
  slug: "imessage-ssh",
  definition: "a bash script run on the machine holding the messages and the output it wrote",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The script is handed to the far machine on standard input.",
    },
    {
      invariantKind: "departure",
      statement: "A far machine exiting other than zero is an operational failure here.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../code-system/module/module.page-type.ts"

export const imessageSend = {
  id: "01a05bc9-4308-7006-988e-9b8bab4f1ec5",
  pageTypeSlug: "module",
  slug: "imessage-send",
  definition: "the script handing a message to Messages on the machine that sends it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every value the script carries is base64 encoded before the shell reads it.",
    },
    {
      invariantKind: "departure",
      statement: "An attachment is written to a temporary folder the script removes on exit.",
    },
    {
      invariantKind: "departure",
      statement: "A message may carry a body or an attachment or both.",
    },
  ],
} as const satisfies Module

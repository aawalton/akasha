import type { Module } from "../../code-system/modules/module.page-type.ts"

export const imessageSend = {
  id: "01a05bc9-4308-7006-988e-9b8bab4f1ec5",
  pageTypeSlug: "module",
  slug: "imessage-send",
  definition: "the script handing a message to Messages on the machine that sends it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every value the script carries is base64 encoded before the shell reads the value.",
    },
    {
      invariantKind: "departure",
      statement: "An attachment is written to a temporary folder the script removes on exit.",
    },
  ],
} as const satisfies Module

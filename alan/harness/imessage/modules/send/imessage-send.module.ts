import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imessageSend = {
  id: "01a05bc9-4308-7006-988e-9b8bab4f1ec5",
  type: "page-type/module",
  slug: "imessage-send",
  definition: "the script handing a message to Messages on the machine that sends it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every value the script has is base64 encoded before the shell reads the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attachment is written to a temporary folder the script removes on exit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each send is its own call to osascript rather than a statement sharing one call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A send that landed is echoed before the next send runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A send that raised stops the script, so nothing after it is echoed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a marker is read as are written here rather than where it is read.",
    },
  ],
} as const satisfies Module

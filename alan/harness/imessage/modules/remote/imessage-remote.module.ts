import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imessageRemote = {
  id: "01a05bc9-4308-7005-8e21-1d68ebecb94c",
  type: "page-type/module",
  slug: "imessage-remote",
  definition: "message and contact reads carried to the machine with them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is resolved through the address book before any handle is matched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name matching nobody is a data failure rather than an empty answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address or a number is matched against handles without the address book.",
    },
  ],
} as const satisfies Module

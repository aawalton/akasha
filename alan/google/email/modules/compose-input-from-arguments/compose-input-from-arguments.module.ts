import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeInputFromArguments = {
  id: "01a0658e-2bf5-7000-bebe-fd0c97b225b3",
  type: "page-type/module",
  slug: "compose-input-from-arguments",
  definition: "how code makes an email from a command's arguments",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address list is split on commas as well as on repeated flags.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty address list is left out rather than carried as an empty list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender given in angle brackets has the name before the brackets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Quotation marks around a sender name are dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attachment is read off the disk before the composition is answered.",
    },
  ],
  createdAt: "2026-09-03T04:36:51.317Z",
  updatedAt: "2026-10-30T15:10:06.745Z",
} as const satisfies Module

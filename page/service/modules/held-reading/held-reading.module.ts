import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldReading = {
  id: "01a0de9c-8e73-7372-b808-9e355be7f9fb",
  type: "page-type/module",
  slug: "held-reading",
  definition: "a reading a server holds of some page types, taken again when their pages change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A server follows the lists of the page types its reading reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change pushed to one of those lists takes the reading again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stream opened again takes the reading again, since a change may have passed unheard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Changes heard while a reading runs are answered by one more reading after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading taken again that fails leaves the reading held before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reading on one server shares one stream.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No timer takes a reading again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A browser follows nothing through this module.",
    },
  ],
} as const satisfies Module

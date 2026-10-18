import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const apnsSending = {
  id: "01a069b6-bb6b-7ca0-81b1-b62e52519bbf",
  type: "page-type/module",
  slug: "apns-sending",
  definition: "a push handed to Apple's push service over a connection kept open",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider token is signed once and used again for fifty minutes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider token names the team the alanwalton app page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One connection to Apple is opened and kept for every later send.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A connection that errored or closed is opened again on the next send.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A 410 answer or a bad device token marks that token to be dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other answer short of 200 is an error the caller is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A send Apple has not answered inside twenty seconds is ended rather than awaited.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With the signing key unset no sender is made at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reason no sender was made is handed back to the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides who a push goes to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every send is an alert.",
    },
  ],
  createdAt: "2026-09-03T23:59:38.347Z",
  updatedAt: "2026-10-18T13:21:54.809Z",
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wakeCommsInput = {
  id: "01a0691b-4f64-7b71-ba64-5c92023f77fe",
  type: "page-type/module",
  slug: "wake-comms-input",
  definition: "a stored message in the shape of the messages that start a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message from an agent is sent by the agent prefix and its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message from anything else is sent by its source.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides whether the message wakes anyone.",
    },
  ],
  createdAt: "2026-09-03T21:09:52.612Z",
  updatedAt: "2026-09-25T17:55:43.000Z",
} as const satisfies Module

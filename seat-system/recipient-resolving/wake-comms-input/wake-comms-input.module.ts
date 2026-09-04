import type { Module } from "@akasha/code-system/module"

export const wakeCommsInput = {
  id: "01a0691b-4f64-7b71-ba64-5c92023f77fe",
  pageTypeSlug: "module",
  slug: "wake-comms-input",
  definition: "a stored message row shaped as the input the wake rules read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A message from an agent is sent by the agent prefix and its id, and any other by its source.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether the message wakes anyone.",
    },
  ],
} as const satisfies Module

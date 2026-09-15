import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushNotifying = {
  id: "01a0686a-7a57-739f-880c-5afe3034b05a",
  type: "module",
  slug: "push-notifying",
  definition: "every notification written for Alan pushed at his devices",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One workstation process does the pushing one thing to a tick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every notification written after the notification last seen is pushed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notification is a row in the feed of the person pushed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first tick after a start begins at the newest row already there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cursor moves past each notification and only ever forward.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No push has an app-icon badge.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing refreshes an app-icon badge on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "With the signing key unset every push is a logged no-op and the feed is still followed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A tick still working past its ceiling ends the process rather than letting a second tick start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The loop runs until that loop is asked to stop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick that threw says what that tick had already delivered before it threw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each tick is handed a list of its own rather than one the loop keeps filling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop ends that loop at the next boundary.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The feed is read and written in pages data rather than in the pages system service.",
    },
  ],
} as const satisfies Module

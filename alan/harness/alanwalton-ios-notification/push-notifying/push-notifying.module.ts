import type { Module } from "@akasha/code/module"

export const pushNotifying = {
  id: "01a0686a-7a57-739f-880c-5afe3034b05a",
  pageTypeSlug: "module",
  type: "module",
  slug: "push-notifying",
  definition: "every notification written for Alan pushed at his devices",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One workstation process does the pushing one thing to a tick.",
    },
    {
      invariantKind: "departure",
      statement: "Every notification written after the notification last seen is pushed.",
    },
    {
      invariantKind: "departure",
      statement: "A notification is a row in the feed of the person pushed at.",
    },
    {
      invariantKind: "departure",
      statement: "The first tick after a start begins at the newest row already there.",
    },
    {
      invariantKind: "departure",
      statement: "The cursor moves past each notification and only ever forward.",
    },
    {
      invariantKind: "absence",
      statement: "No push has an app-icon badge.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing refreshes an app-icon badge on its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "With the signing key unset every push is a logged no-op and the feed is still followed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working past its ceiling ends the process rather than letting a second tick start.",
    },
    {
      invariantKind: "departure",
      statement: "The loop runs until that loop is asked to stop.",
    },
    {
      invariantKind: "departure",
      statement: "A stop ends that loop at the next boundary.",
    },
    {
      invariantKind: "gap",
      statement:
        "The feed is read and written in pages data rather than in the pages system service.",
    },
  ],
} as const satisfies Module

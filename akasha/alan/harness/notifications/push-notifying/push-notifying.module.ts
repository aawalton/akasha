import type { Module } from "@akasha/code-system/module"

export const pushNotifying = {
  id: "01a0686a-7a57-739f-880c-5afe3034b05a",
  pageTypeSlug: "module",
  slug: "push-notifying",
  definition: "every notification written for Alan pushed at his devices",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One workstation process does the pushing, one thing to a tick.",
    },
    {
      invariantKind: "departure",
      statement: "Every notification written since the one last seen is pushed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A notification stands as a row in the feed of the person it was pushed at, so the feed is what is watched.",
    },
    {
      invariantKind: "departure",
      statement:
        "The first tick after a start begins at the newest row already standing, so a start is no flood.",
    },
    {
      invariantKind: "departure",
      statement:
        "The cursor moves past each notification and only ever forward, so nothing it has passed is offered a second time.",
    },
    {
      invariantKind: "absence",
      statement: "No push carries an app-icon badge, and nothing refreshes one on its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "With the signing key unset every push is a logged no-op and the feed is still followed, so nothing is pushed twice once the key is set.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working when its ceiling passes ends the process rather than letting a second one start beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The loop runs until it is asked to stop, and a stop ends it at the next boundary.",
    },
    {
      invariantKind: "gap",
      statement:
        "Notifications are read and the feed written from the pages data directly rather than through the pages system service, as code standing on the workstation must.",
    },
  ],
} as const satisfies Module

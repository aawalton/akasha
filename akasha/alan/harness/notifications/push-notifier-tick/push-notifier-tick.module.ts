import type { Module } from "@akasha/code-system/module"

export const pushNotifierTick = {
  id: "01a069b6-bb6b-79e0-abb9-81217fe400a3",
  pageTypeSlug: "module",
  slug: "push-notifier-tick",
  definition: "one round of the notifier: read what is new in the feed and push each of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first tick after a start opens at the newest row already there.",
    },
    {
      invariantKind: "departure",
      statement: "The cursor moves past each notification and only forward.",
    },
    {
      invariantKind: "departure",
      statement: "A push that throws is complained about rather than retried.",
    },
    {
      invariantKind: "departure",
      statement: "The cursor moves past a notification whose push threw.",
    },
    {
      invariantKind: "departure",
      statement: "With no sender the cursor still moves past every notification.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing the cursor has moved past is pushed once a sender is set.",
    },
    {
      invariantKind: "departure",
      statement: "A person with no device is said aloud rather than treated as a fault.",
    },
    {
      invariantKind: "departure",
      statement: "A tick past its ceiling is ended rather than left to run beside the next one.",
    },
    {
      invariantKind: "absence",
      statement: "No push carries an app-icon badge.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refreshes an app-icon badge.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits between one tick and the next.",
    },
  ],
} as const satisfies Module

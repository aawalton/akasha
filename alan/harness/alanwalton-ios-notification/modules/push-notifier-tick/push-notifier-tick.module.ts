import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushNotifierTick = {
  id: "01a069b6-bb6b-79e0-abb9-81217fe400a3",
  type: "page-type/module",
  slug: "push-notifier-tick",
  definition: "one round of the notifier: read what is new in the feed and push each of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first tick after a start opens at the newest row already there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cursor moves past each notification and only forward.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push that throws is complained about rather than retried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push delivered to a phone is named as soon as that phone has it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device token taken away is named as soon as that token is gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cursor moves past a notification whose push threw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "With no sender the cursor still moves past every notification.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing the cursor has moved past is pushed once a sender is set.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A person with no device is said aloud rather than treated as a fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick past its ceiling is ended rather than left to run beside the next tick.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No push has an app-icon badge.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here refreshes an app-icon badge.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here waits between one tick and the next.",
    },
  ],
} as const satisfies Module

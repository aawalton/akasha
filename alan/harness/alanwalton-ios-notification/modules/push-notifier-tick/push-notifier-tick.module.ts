import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushNotifierTick = {
  id: "01a069b6-bb6b-79e0-abb9-81217fe400a3",
  type: "page-type/module",
  slug: "push-notifier-tick",
  definition: "one round of the notifier: push what is new in the feed and any reading that moved",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The first tick after a start opens at the newest row already there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cursor moves past each notification and only forward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push that throws is complained about rather than retried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push delivered to a phone is named as soon as that phone has it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device token taken away is named as soon as that token is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cursor moves past a notification whose push threw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With no sender the cursor still moves past every notification.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing the cursor has moved past is pushed once a sender is set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person with no device is said aloud rather than treated as a fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick past its ceiling is ended rather than left to run beside the next tick.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No push has an app-icon badge.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here refreshes an app-icon badge.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits between one tick and the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick pushes the live activity after the notifications that tick found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What was last pushed to the activity is kept beside the feed's cursor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A live activity leg that threw leaves the feed's cursor where the feed left it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With no sender the live activity leg is skipped along with the feed's.",
    },
  ],
} as const satisfies Module

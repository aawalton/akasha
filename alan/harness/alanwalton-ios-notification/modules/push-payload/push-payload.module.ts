import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushPayload = {
  id: "01a069b6-bb6b-7ff9-a785-a069880a2e41",
  type: "page-type/module",
  slug: "push-payload",
  definition: "what a push carries, and whose devices it is carried to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A push deep-links to the link its notification states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push whose notification states no link deep-links to the feed page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The deep-link route rides outside `aps` at the payload's top level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person a notification belongs to is always among the ones pushed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surplus fall also reaches the shared app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each person is pushed at through the app that pushes to that person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push carries a deep link only to an app that opens a tapped route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nobody is pushed at twice where the shared app is owned by the same person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person no app pushes to is pushed at by nobody.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Every app a push reaches is named on `push-apps` rather than here.",
    },
  ],
  createdAt: "2026-09-03T23:59:38.347Z",
  updatedAt: "2026-10-24T19:54:54.376Z",
} as const satisfies Module

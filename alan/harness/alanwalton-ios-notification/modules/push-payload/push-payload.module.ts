import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushPayload = {
  id: "01a069b6-bb6b-7ff9-a785-a069880a2e41",
  type: "module",
  slug: "push-payload",
  definition: "what one push carries, and whose devices it is carried to",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every push deep-links to the feed page.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The feed page is the only page a notification has.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No kind of push routes anywhere else.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The deep-link route rides outside `aps` at the payload's top level.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The person a notification belongs to is always among the ones pushed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus fall also reaches the shared app.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push to the shared app has no deep link.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nobody is pushed at twice where the shared app is owned by the same person.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Every app a push reaches is named on `push-apps` rather than here.",
    },
  ],
} as const satisfies Module

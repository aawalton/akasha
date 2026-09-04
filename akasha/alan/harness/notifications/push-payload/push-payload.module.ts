import type { Module } from "@akasha/code-system/module"

export const pushPayload = {
  id: "01a069b6-bb6b-7ff9-a785-a069880a2e41",
  pageTypeSlug: "module",
  slug: "push-payload",
  definition: "what one push carries, and whose devices it is carried to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every push deep-links to the feed page.",
    },
    {
      invariantKind: "constraint",
      statement: "The feed page is the only page a notification has.",
    },
    {
      invariantKind: "absence",
      statement: "No kind of push routes anywhere else.",
    },
    {
      invariantKind: "constraint",
      statement: "The deep-link route rides outside `aps` at the payload's top level.",
    },
    {
      invariantKind: "departure",
      statement: "The person a notification belongs to is always among the ones pushed at.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus fall also reaches the shared app.",
    },
    {
      invariantKind: "departure",
      statement: "A push to the shared app carries no deep link.",
    },
    {
      invariantKind: "departure",
      statement: "Nobody is pushed at twice where the shared app is owned by the same person.",
    },
    {
      invariantKind: "absence",
      statement: "Every app a push reaches is named on `push-apps` rather than here.",
    },
  ],
} as const satisfies Module

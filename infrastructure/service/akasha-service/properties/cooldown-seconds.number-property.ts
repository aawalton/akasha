import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const cooldownSeconds = {
  id: "01a09575-b92e-7662-9a1d-d8f33a5aa003",
  type: "page-type/number-property",
  slug: "cooldown-seconds",
  propertySlug: "cooldown-seconds",
  definition: "how long a service waits after a deploy before that service is deployed again",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait is counted from the moment the last deploy of that service ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating nothing here waits the hour every service waits by default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The wait keeps a run of commits from putting the same service up once for each commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service a person deploys by hand waits out nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-12T11:51:55.438Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies NumberProperty

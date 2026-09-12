import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const cooldownSeconds = {
  id: "01a09575-b92e-7662-9a1d-d8f33a5aa003",
  type: "number-property",
  slug: "cooldown-seconds",
  propertySlug: "cooldown-seconds",
  definition: "how long a service waits after a deploy before that service is deployed again",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The wait is counted from the moment the last deploy of that service ended.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating nothing here waits the minute every service waits by default.",
    },
    {
      invariantKind: "departure",
      statement:
        "The wait keeps a run of commits from putting the same service up once for each commit.",
    },
    {
      invariantKind: "departure",
      statement: "A service a person deploys by hand waits out nothing.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty

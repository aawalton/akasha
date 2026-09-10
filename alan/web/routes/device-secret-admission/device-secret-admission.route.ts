import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const deviceSecretAdmission = {
  id: "01a08243-801c-7c22-aeb9-ab9b8c8261dc",
  pageTypeSlug: "route",
  type: "route",
  slug: "device-secret-admission",
  definition: "whether the secret a phone has is still one the store admits",
  code: "ts",
  urlPath: "api/device-secret/admission",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is the one route a phone asks whether the secret it has is still good.",
    },
    {
      invariantKind: "departure",
      statement: "The route has no reading, so it judges the credential alone.",
    },
    {
      invariantKind: "departure",
      statement: "No route-access hold and no grant lookup comes between the ask and the answer.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here fails closed on a store outage.",
    },
    {
      invariantKind: "departure",
      statement: "A store admitting the secret answers 200.",
    },
    {
      invariantKind: "departure",
      statement: "A store refusing the secret answers 401.",
    },
    {
      invariantKind: "departure",
      statement: "A store that did not answer at all answers 503.",
    },
    {
      invariantKind: "departure",
      statement: "A body names no reason, as every refusal on this site does.",
    },
  ],
} as const satisfies Route

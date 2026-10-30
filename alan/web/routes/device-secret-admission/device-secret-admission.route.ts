import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const deviceSecretAdmission = {
  id: "01a08243-801c-7c22-aeb9-ab9b8c8261dc",
  type: "page-type/route",
  slug: "device-secret-admission",
  definition: "whether a device has lost its secret",
  code: "ts",
  urlPath: "api/device-secret/admission",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phone asks this route alone whether the secret that phone has is still good.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The route has no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The route judges the credential alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No route-access hold and no grant lookup comes between the ask and the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here fails closed on a store outage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store admitting the secret answers 200.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store refusing the secret answers 401.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store that did not answer at all answers 503.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body names no reason.",
    },
  ],
  createdAt: "2026-09-08T18:24:16.924Z",
  updatedAt: "2026-10-30T16:59:58.488Z",
} as const satisfies Route

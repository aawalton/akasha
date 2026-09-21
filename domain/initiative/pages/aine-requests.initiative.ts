import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineRequests = {
  id: "01a0b79c-7791-7361-9dfd-ddc209fb5fee",
  type: "page-type/initiative",
  slug: "aine-requests",
  domain: "page-type/feature-request",
  persona: "persona/aine",
  intentStack: [],
  constraints: [
    "Past launch, a feature of the request system is itself a feature request contributors back, like a feature of any other product.",
  ],
} as const satisfies Initiative

import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineRequests = {
  id: "01a0b79c-7791-7361-9dfd-ddc209fb5fee",
  type: "page-type/initiative",
  slug: "aine-requests",
  domain: "domain/feature-request",
  persona: "persona/aine",
  intentStack: [
    { statement: "Every feature request is a page naming the product that request is for." },
    {
      statement:
        "Every product serves the feature requests for that product at `requests` under its own domain.",
    },
  ],
} as const satisfies Initiative

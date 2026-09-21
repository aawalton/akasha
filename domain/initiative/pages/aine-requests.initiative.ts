import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineRequests = {
  id: "01a0b79c-7791-7361-9dfd-ddc209fb5fee",
  type: "page-type/initiative",
  slug: "aine-requests",
  domain: "page-type/feature-request",
  persona: "persona/aine",
  intentStack: [
    {
      statement:
        "A `Requests` nav item on alanwalton.com has a view for each standing a request is at.",
      workingMemory:
        "The views are Proposed, Published, Completed and Denied, in that order, each narrowing `standing` to its own value. A view narrows by the key a page spells rather than by the property's slug, so `standing` rather than `feature-request-standing`. Alan asked for the views to match the standings rather than bundle them.",
    },
  ],
  constraints: [
    "Past launch, a feature of the request system is itself a feature request contributors back, like a feature of any other product.",
  ],
} as const satisfies Initiative

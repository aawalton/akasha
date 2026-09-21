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
        "Temper, alanwalton and smilingjenny each serve their feature requests at `requests`.",
      workingMemory:
        "The three are tempereso.com, alanwalton.com and smilingjenny.me. A site serves a path of its own only by a router app: a route page stating its `urlPath` beside a `.route.code.tsx`, named in that app's `.app-routes.ts` parts and in its `routes.ts` table, reached over the hostname that app's `tunnel-routes.ts` states. `product/audhdalan/web/routes/audhdalan-safety-levels` is the shape. Temper and alanwalton are no part of `domain/product`.",
    },
    {
      statement:
        "A `Requests` nav item on alanwalton.com shows the open, the waiting and the settled.",
      workingMemory:
        "The three views read `standing`: open is `published`, most points first; waiting is `proposed`, which is what needs Alan; settled is `completed` beside `denied`. Alan asked for up to three views and left which three open.",
    },
  ],
  constraints: [
    "Past launch, a feature of the request system is itself a feature request contributors back, like a feature of any other product.",
  ],
} as const satisfies Initiative

import type { Route } from "@akasha/code/route"

export const pagesReady = {
  id: "01a072b4-378d-70ab-8d75-5361b4ca7293",
  pageTypeSlug: "route",
  type: "route",
  slug: "pages-ready",
  definition: "whether this pod can read a page",
  code: "ts",
  test: "ts",
  urlPath: "api/pages-ready",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This route is asked without a session and answers without any page's content.",
    },
    { invariantKind: "departure", statement: "Going red here is a report rather than a kill." },
    {
      invariantKind: "constraint",
      statement: "Going red at the liveness probe kills the container and pulls the replica out.",
    },
    { invariantKind: "departure", statement: "A read answering no page is red rather than green." },
    {
      invariantKind: "departure",
      statement: "An empty answer is the shape a broken read makes when it is not raising.",
    },
    {
      invariantKind: "departure",
      statement: "Every red the route can answer is shown by a test seeding that fault.",
    },
  ],
} as const satisfies Route

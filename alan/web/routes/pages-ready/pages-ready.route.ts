import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const pagesReady = {
  id: "01a072b4-378d-70ab-8d75-5361b4ca7293",
  type: "page-type/route",
  slug: "pages-ready",
  definition: "whether this pod can read a page",
  code: "ts",
  test: "ts",
  urlPath: "api/pages-ready",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route is asked without a session and answers without any page's content.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Going red here is a report rather than a kill.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Going red at the liveness probe kills the container and pulls the replica out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read answering no page is red rather than green.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty answer is the shape a broken read makes when the read is not raising.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every red the route can answer is shown by a test seeding that fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The probe reads as the system, so no reader's grant can turn this red.",
    },
  ],
} as const satisfies Route

import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebRequests = {
  id: "01a0c4b8-da5b-7951-8da4-29d8cdf3e4cd",
  type: "page-type/route",
  slug: "alan-web-requests",
  definition: "the feature requests published for alanwalton.com",
  code: "tsx",
  urlPath: "requests",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This page is open to a reader who has not signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This page serves the published requests alone, most points first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who has not signed in is offered no form and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor signed in is shown what that contributor holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One form opens a request, and one form by each request boosts that request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden field says which of the two acts a post is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a post does is worked out by `feature-request-writing` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is drawn as plain words by the form that drew the refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request opened here is proposed, so it is listed once Alan publishes it.",
    },
  ],
} as const satisfies Route

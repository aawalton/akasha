import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestAsking = {
  id: "01a0c537-684d-7fd0-99ad-d5b2ebf5cef4",
  type: "page-type/module",
  slug: "feature-request-asking",
  definition: "the answer a site gives a post opening a feature request or boosting one",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A post says which act it is, and an act this names none of is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor is handed in, so who is signed in is read by the site instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A post by nobody signed in is refused with 401 rather than 400.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is no object is refused as a body saying nothing to do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points said as text are read as a number, and text that is no number is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a post lands is worked out by `feature-request-writing` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is answered as JSON with 400, carrying the words the writing gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act that landed answers the slug it landed on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No product is read here, so a site says which product its posts are for.",
    },
  ],
} as const satisfies Module

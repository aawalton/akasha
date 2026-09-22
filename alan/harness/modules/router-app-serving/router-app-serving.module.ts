import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const routerAppServing = {
  id: "01a0c553-29bb-7ff4-8e78-95ff8d8a042e",
  type: "page-type/module",
  slug: "router-app-serving",
  definition: "how a router app answers a request, and who the request's reader is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every router app answers a request the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app states what differs and never states how a request is answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What differs is the folder served, the policy widened, and how a reader is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file under the client folder is answered before any route is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A site says whether every read under a request is held to what its reader reaches.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A site saying nothing is held to nothing, which is where every site was before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A site held that way reaches every route inside the reader it read the request as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource route is reached that way as a document route is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an answer that is HTML is given the policy and the caching this sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A site every visitor reads as one person names that person rather than reading a session.",
    },
  ],
} as const satisfies Module

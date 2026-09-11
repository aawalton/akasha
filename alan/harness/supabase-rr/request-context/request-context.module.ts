import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const requestContext = {
  id: "01a08dfb-590c-781c-8b39-2c8c78aa6740",
  pageTypeSlug: "module",
  type: "module",
  slug: "request-context",
  definition: "the client and the user a request is carried out as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A bearer token is read before the session cookie, and settles the request alone.",
    },
    {
      invariantKind: "departure",
      statement: "A request carrying no bearer token falls back to its session cookie.",
    },
    {
      invariantKind: "departure",
      statement: "A bearer token nobody answers to leaves the request unauthenticated.",
    },
    {
      invariantKind: "departure",
      statement: "A client scoped to a bearer token reaches only what that token reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The headers a session refresh asks for are carried on to the answer.",
    },
  ],
} as const satisfies Module

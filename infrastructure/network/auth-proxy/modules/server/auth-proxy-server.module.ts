import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authProxyServer = {
  id: "01a06863-8e7c-7ef6-a465-4e287ec25a18",
  type: "page-type/module",
  slug: "auth-proxy-server",
  definition: "every request answered, refused or sent on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A request with an authorization header is passed straight through for the backend to decide.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A few paths answer with a canned empty body rather than a not-found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path route is looked for before the host's own route is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser with no session is sent to sign in and anything else is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading this module starts the server.",
    },
  ],
} as const satisfies Module

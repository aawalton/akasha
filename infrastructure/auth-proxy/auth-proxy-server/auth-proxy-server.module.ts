import type { Module } from "@akasha/code-system/module"

export const authProxyServer = {
  id: "01a06863-8e7c-7ef6-a465-4e287ec25a18",
  pageTypeSlug: "module",
  slug: "auth-proxy-server",
  definition: "every request answered, refused or sent on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A request carrying an authorization header is passed straight through for the backend to decide.",
    },
    {
      invariantKind: "departure",
      statement: "A few paths answer with a canned empty body rather than a not-found.",
    },
    {
      invariantKind: "departure",
      statement: "A path route is looked for before the host's own route is.",
    },
    {
      invariantKind: "departure",
      statement: "A browser with no session is sent to sign in and anything else is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Loading this starts the server.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const sessionIdentity = {
  id: "01a06863-8e7c-7703-ae2b-76173d35d19f",
  pageTypeSlug: "module",
  slug: "session-identity",
  definition: "who a Supabase session cookie proves a request is from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A failed check is remembered for a shorter time than a successful check.",
    },
    {
      invariantKind: "departure",
      statement: "A token is remembered no longer than the token itself lasts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A signing key the proxy does not hold is fetched once more before the token fails.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the auth server about a token.",
    },
  ],
} as const satisfies Module

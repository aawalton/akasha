import type { Module } from "@akasha/code-system/module"

export const readOnlyHarness = {
  id: "01a05ca9-d803-7362-b933-e54ad04b2b64",
  pageTypeSlug: "module",
  slug: "read-only-harness",
  definition: "a browser session opened over a user who is only ever read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Signing in as the protected user is refused unless the caller opted in deliberately.",
    },
  ],
} as const satisfies Module

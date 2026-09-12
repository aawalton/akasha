import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const cookieMatchCore = {
  id: "01a06863-8e7c-7c09-8de5-7989e7888711",
  type: "module",
  slug: "cookie-match-core",
  definition: "a cookie name read as a Supabase auth token chunk",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name with no chunk number is the first chunk.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../code-system/modules/module.page-type.ts"

export const auth = {
  id: "01a05c6d-3508-781d-8ca6-f6de618f4ea6",
  pageTypeSlug: "module",
  slug: "auth",
  definition: "signing in, signing up, signing out and reading who is signed in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every call here takes the Supabase client rather than making one.",
    },
    {
      invariantKind: "absence",
      statement: "No URL and no key is read here.",
    },
    {
      invariantKind: "departure",
      statement: "A failed call is handed back as a value rather than thrown.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../code-system/modules/module.page-type.ts"

export const userClient = {
  id: "01a05c91-61cd-7ca0-84dc-81d150423884",
  pageTypeSlug: "module",
  slug: "user-client",
  definition: "the Supabase client a signed-in person acts through, bound by row policy",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The URL and the anonymous key are handed in by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A session is kept and refreshed on its own.",
    },
    {
      invariantKind: "absence",
      statement: "No session is read out of the address bar.",
    },
  ],
} as const satisfies Module

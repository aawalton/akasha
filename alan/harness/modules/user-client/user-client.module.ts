import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const userClient = {
  id: "01a05c91-61cd-7ca0-84dc-81d150423884",
  type: "page-type/module",
  slug: "user-client",
  definition: "the Supabase client a signed-in person acts through, bound by row policy",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No key is here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The client made here reaches only as far as the signed-in person may.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The URL and the anonymous key are handed in by the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session is kept and refreshed on its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No session is read out of the address bar.",
    },
  ],
} as const satisfies Module

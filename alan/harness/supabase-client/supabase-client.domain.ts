import type { Domain } from "../../../domains/domain.page-type.ts"

export const supabaseClient = {
  id: "01a05c91-61cc-7d0c-bbf1-b3f2103ad9d0",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "supabase-client",
  definition: "the Supabase client a person acts through rather than a server",
  parts: ["module/user-client"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No key is here.",
    },
    {
      invariantKind: "departure",
      statement: "The client made here reaches only as far as the signed-in person may.",
    },
  ],
} as const satisfies Domain

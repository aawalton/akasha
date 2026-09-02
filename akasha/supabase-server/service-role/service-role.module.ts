import type { Module } from "../../code-system/modules/module.page-type.ts"

export const serviceRole = {
  id: "01a05c75-871a-75ee-b566-9d7b5f975f72",
  pageTypeSlug: "module",
  slug: "service-role",
  definition: "the Supabase client acting as the service role, past every row policy",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The URL is read from the environment when the caller names no URL.",
    },
    {
      invariantKind: "departure",
      statement: "The key is read from the environment when the caller names no key.",
    },
    {
      invariantKind: "departure",
      statement: "A request outrunning its timeout is aborted.",
    },
    {
      invariantKind: "departure",
      statement: "An error body that is not JSON comes back summarised rather than whole.",
    },
    {
      invariantKind: "constraint",
      statement: "A request is given thirty seconds unless the caller says otherwise.",
    },
  ],
} as const satisfies Module

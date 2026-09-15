import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceRole = {
  id: "01a05c75-871a-75ee-b566-9d7b5f975f72",
  type: "module",
  slug: "service-role",
  definition: "the Supabase client acting as the service role, past every row policy",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The URL is read from the environment when the caller names no URL.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key is read from the environment when the caller names no key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request outrunning its timeout is aborted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error body that is not JSON comes back summarised rather than whole.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A request is given thirty seconds unless the caller says otherwise.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code/module"

export const persistMedia = {
  id: "01a0685d-4b35-7011-b5f2-eee71f6ba3fd",
  pageTypeSlug: "module",
  type: "module",
  slug: "persist-media",
  definition: "landing a page for what a run made and putting the bytes beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page lands before its bytes are published.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes have an identity to go under.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that says not to persist is obeyed whatever the operation was.",
    },
  ],
} as const satisfies Module

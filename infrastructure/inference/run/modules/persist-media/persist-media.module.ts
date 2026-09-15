import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const persistMedia = {
  id: "01a0685d-4b35-7011-b5f2-eee71f6ba3fd",
  type: "module",
  slug: "persist-media",
  definition: "landing a page for what a run made and putting the bytes beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page lands before its bytes are published.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bytes have an identity to go under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller that says not to persist is obeyed whatever the operation was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page landing is pushed into the caller's `done` before the bytes go up.",
    },
  ],
} as const satisfies Module

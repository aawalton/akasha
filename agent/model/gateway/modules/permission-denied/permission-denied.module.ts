import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const permissionDenied = {
  id: "01a0628c-26f7-7c6b-8758-0f0588e8ddf1",
  type: "module",
  slug: "permission-denied",
  definition: "what a 403 body says about upstream refusing the caller permission",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status other than 403 matches nothing.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with no Anthropic error envelope matches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An envelope naming an error type other than `permission_error` matches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body carrying keys the envelope does not name still matches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A match has the envelope message as the reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A match reading an envelope with no message has `permission_error` as the reason.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sees a response beyond the status and the body.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An envelope message that is an empty string becomes an empty reason.",
    },
  ],
} as const satisfies Module

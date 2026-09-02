import type { Module } from "@akasha/code-system/module"

export const permissionDenied = {
  id: "01a0628c-26f7-7c6b-8758-0f0588e8ddf1",
  pageTypeSlug: "module",
  slug: "permission-denied",
  definition: "what a 403 body says about upstream refusing the caller permission",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A status other than 403 matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body the JSON parser refuses matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying no Anthropic error envelope matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An envelope naming an error type other than `permission_error` matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying keys the envelope does not name still matches.",
    },
    {
      invariantKind: "departure",
      statement: "A match carries the envelope message as the reason.",
    },
    {
      invariantKind: "departure",
      statement:
        "A match reading an envelope with no message carries `permission_error` as the reason.",
    },
    {
      invariantKind: "departure",
      statement: "isPermissionDenied answers the matched flag classifyPermissionDenied returns.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sees more of a response than the status and the body.",
    },
    {
      invariantKind: "gap",
      statement: "An envelope message that is an empty string becomes an empty reason.",
    },
  ],
} as const satisfies Module

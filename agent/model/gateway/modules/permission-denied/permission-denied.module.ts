import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const permissionDenied = {
  id: "01a0628c-26f7-7c6b-8758-0f0588e8ddf1",
  type: "page-type/module",
  slug: "permission-denied",
  definition: "what a 403 body says about upstream refusing the caller permission",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A status other than 403 matches nothing.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A body with no Anthropic error envelope matches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An envelope naming an error type other than `permission_error` matches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying keys the envelope does not name still matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A match has the envelope message as the reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A match reading an envelope with no message or an empty one has `permission_error` as the reason.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sees a response beyond the status and the body.",
    },
  ],
} as const satisfies Module

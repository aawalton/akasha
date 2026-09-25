import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelUnavailable = {
  id: "01a0628c-26f7-71b6-893e-e3d3e34bb01f",
  type: "page-type/module",
  slug: "model-unavailable",
  definition: "what a 404 body says about upstream not carrying the model",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A status other than 404 matches nothing.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A body with no Anthropic error envelope matches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An envelope naming an error type other than `not_found_error` matches nothing.",
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
        "A match reading an envelope with no message or an empty one has `not_found_error` as the reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason no account has marked decides mark-rebind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason the current account marked first decides mark-rebind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason another account marked first decides global-unmark naming that account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reason a classification carries is the key the marks are held under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to the map of marked reasons.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sees a response beyond the status and the body.",
    },
  ],
} as const satisfies Module

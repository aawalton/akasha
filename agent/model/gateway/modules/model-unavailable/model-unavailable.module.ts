import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelUnavailable = {
  id: "01a0628c-26f7-71b6-893e-e3d3e34bb01f",
  type: "page-type/module",
  slug: "model-unavailable",
  definition: "what a 404 body says about upstream not carrying the model asked for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status other than 404 matches nothing.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with no Anthropic error envelope matches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An envelope naming an error type other than `not_found_error` matches nothing.",
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
      statement: "A match reading an envelope with no message has `not_found_error` as the reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason no account has marked decides mark-rebind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason the current account marked first decides mark-rebind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason another account marked first decides global-unmark naming that account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reason a classification carries is the key the marks are held under.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to the map of marked reasons.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sees a response beyond the status and the body.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An envelope message that is an empty string becomes an empty reason.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A mark held under an empty account name decides global-unmark.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const modelUnavailable = {
  id: "01a0628c-26f7-71b6-893e-e3d3e34bb01f",
  pageTypeSlug: "module",
  slug: "model-unavailable",
  definition: "what a 404 body says about upstream not carrying the model asked for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A status other than 404 matches nothing.",
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
      statement: "An envelope naming an error type other than `not_found_error` matches nothing.",
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
        "A match reading an envelope with no message carries `not_found_error` as the reason.",
    },
    {
      invariantKind: "departure",
      statement: "isModelUnavailable answers the matched flag classifyModelUnavailable returns.",
    },
    {
      invariantKind: "departure",
      statement: "A reason no account has marked decides mark-rebind.",
    },
    {
      invariantKind: "departure",
      statement: "A reason the current account marked first decides mark-rebind.",
    },
    {
      invariantKind: "departure",
      statement: "A reason another account marked first decides global-unmark naming that account.",
    },
    {
      invariantKind: "departure",
      statement: "The reason a classification carries is the key the marks are held under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the map of marked reasons.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sees more of a response than the status and the body.",
    },
    {
      invariantKind: "gap",
      statement: "An envelope message that is an empty string becomes an empty reason.",
    },
    {
      invariantKind: "gap",
      statement: "A mark held under an empty account name decides global-unmark.",
    },
  ],
} as const satisfies Module

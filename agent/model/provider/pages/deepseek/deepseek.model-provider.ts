import type { ModelProvider } from "akasha/agent/model/provider/model-provider.page-type.types.ts"

export const deepseek = {
  id: "01a0a21a-3c53-76c5-b51f-a92017d82a1d",
  type: "page-type/model-provider",
  slug: "deepseek",
  definition: "the provider that serves DeepSeek's models",
  apiBase: "https://api.deepseek.com/anthropic",
  providerModel: "deepseek-flash",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A name opening `claude-opus` is served by deepseek-v4-pro and every other name by deepseek-flash.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A name of DeepSeek's own is served by that model rather than mapped to one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Akasha asks DeepSeek for deepseek-flash and never for deepseek-v4-pro.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A request carries one key in an `x-api-key` header rather than an oauth pair.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "`cache_control` is taken and ignored, so a prompt is paid for whole every turn.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A document block, a thinking budget and `top_k` are taken and ignored.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "Requests in flight are capped at 500 for deepseek-v4-pro and 2500 for deepseek-flash.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An account is prepaid, so a spent balance refuses every request.",
    },
  ],
} as const satisfies ModelProvider

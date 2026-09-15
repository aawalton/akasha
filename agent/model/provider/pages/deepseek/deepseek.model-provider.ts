import type { ModelProvider } from "akasha/agent/model/provider/model-provider.page-type.types.ts"

export const deepseek = {
  id: "01a0a21a-3c53-76c5-b51f-a92017d82a1d",
  type: "model-provider",
  slug: "deepseek",
  definition: "the provider that serves DeepSeek's models",
  apiBase: "https://api.deepseek.com/anthropic",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A name opening `claude-opus` is served by deepseek-v4-pro and every other name by deepseek-flash.",
    },
    {
      invariantKind: "constraint",
      statement: "A request carries one key in an `x-api-key` header rather than an oauth pair.",
    },
    {
      invariantKind: "constraint",
      statement: "`cache_control` is taken and ignored, so a prompt is paid for whole every turn.",
    },
    {
      invariantKind: "constraint",
      statement: "A document block, a thinking budget and `top_k` are taken and ignored.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Requests in flight are capped at 500 for deepseek-v4-pro and 2500 for deepseek-flash.",
    },
    {
      invariantKind: "constraint",
      statement: "An account is prepaid, so a spent balance refuses every request.",
    },
  ],
} as const satisfies ModelProvider

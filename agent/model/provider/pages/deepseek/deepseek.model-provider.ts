import type { ModelProvider } from "akasha/agent/model/provider/model-provider.page-type.types.ts"

export const deepseek = {
  id: "01a0a21a-3c53-76c5-b51f-a92017d82a1d",
  type: "page-type/model-provider",
  slug: "deepseek",
  definition: "the external service that runs the models DeepSeek makes",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "DeepSeek" }],
  apiBase: "https://api.deepseek.com/anthropic",
  providerModel: "deepseek-flash",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A name opening `claude-opus` is served by deepseek-v4-pro and every other name by deepseek-flash.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name of DeepSeek's own is served by that model rather than mapped to one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Akasha asks DeepSeek for deepseek-flash and never for deepseek-v4-pro.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A request carries one key in an `x-api-key` header rather than an oauth pair.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "`cache_control` is taken and ignored, and a prompt opening as a recent one did is read from cache.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A document block, a thinking budget and `top_k` are taken and ignored.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Requests in flight are capped at 500 for deepseek-v4-pro and 2500 for deepseek-flash.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An account is prepaid, so a spent balance refuses every request.",
    },
  ],
  createdAt: "2026-09-14T22:47:03.507Z",
  updatedAt: "2026-10-08T16:11:25.099Z",
} as const satisfies ModelProvider

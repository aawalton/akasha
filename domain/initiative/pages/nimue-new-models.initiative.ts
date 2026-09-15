import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueNewModels = {
  id: "01a0a1ec-0c95-7cb4-beb9-6234dfa06568",
  type: "initiative",
  slug: "nimue-new-models",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "The gateway falls back to DeepSeek where every model-account is at its limit.",
      workingMemory:
        "`account-walk` marks an account at its limit, excludes that account, and rebinds to the next. DeepSeek is bound the moment that leaves `no-viable-account`, ahead of the re-probing `pre-forward-queue` does and the 429 `rate-limit-refusal` hands back. Those two answer only where DeepSeek itself refuses. Every seat falls back this way, the seat Alan is sitting in as well as a seat running behind him.",
    },
  ],
  constraints: [
    "DeepSeek's Anthropic endpoint drops cache_control, so a prompt cached against Claude is paid for whole.",
    "DeepSeek's Anthropic endpoint takes no document block, no thinking budget and no top_k.",
  ],
} as const satisfies Initiative

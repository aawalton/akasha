import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const nimueNewModels = {
  id: "01a0a1ec-0c95-7cb4-beb9-6234dfa06568",
  type: "initiative",
  slug: "nimue-new-models",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "Every model provider akasha reaches is a page.",
      workingMemory:
        'Nothing in akasha names a provider. The gateway forwards to `UPSTREAM_BASE = "https://api.anthropic.com"`, written into `forward.module.code.ts` and already stated there as a gap. A provider page carries the base a request goes to and the wire shape that provider speaks.',
    },
    {
      statement: "Every account akasha holds with a model provider is a model-account.",
      workingMemory:
        "`claude-account` carries thirty-odd properties, nearly all of them Anthropic subscription facts: oauth tokens, five-hour and seven-day windows, subscription type, renewal day. What generalizes is the provider an account is with, the credential that account holds, and whether that account is eligible now. Selection ranks on those windows today, so a provider whose limits are not windows has nothing to rank on.",
    },
    {
      statement: "DeepSeek is a model provider akasha holds a model-account with.",
      workingMemory:
        "DeepSeek speaks the Anthropic wire shape at `https://api.deepseek.com/anthropic` under an `x-api-key` header, so only the base and the key differ. A `claude-opus` name maps to `deepseek-v4-pro` and `claude-sonnet` or `claude-haiku` to `deepseek-flash`, both holding 1M context. The key is a page secret rather than an oauth token, and the account is prepaid rather than a subscription.",
    },
    {
      statement: "The gateway falls back to DeepSeek where every claude-account is at its limit.",
      workingMemory:
        "`account-walk` marks an account at its limit, excludes that account, and rebinds to the next. DeepSeek is bound the moment that leaves `no-viable-account`, ahead of the re-probing `pre-forward-queue` does and the 429 `rate-limit-refusal` hands back. Those two answer only where DeepSeek itself refuses.",
    },
  ],
  constraints: [
    "DeepSeek's Anthropic endpoint drops cache_control, so a prompt cached against Claude is paid for whole.",
    "DeepSeek's Anthropic endpoint takes no document block, no thinking budget and no top_k.",
  ],
} as const satisfies Initiative

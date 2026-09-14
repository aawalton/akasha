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
        "`model-account` is one Anthropic subscription that calls are made on. Its body states email, alias index, subscription type, rate limit tier, renewal day and scopes; its credential is an oauth pair in sops; its two windows are marks beside the page, and eligibility is computed from them. What generalizes is the provider, the credential and eligibility. `oauth-effects` is the one seam the gateway reaches accounts through.",
    },
    {
      statement: "DeepSeek is a model provider akasha holds a model-account with.",
      workingMemory:
        "Alan's key is live and answers at `https://api.deepseek.com/anthropic` under an `x-api-key` header, so only the base and the auth differ. A request carrying `claude-opus-5[1m]`, a cached system block, cached tools and a tool choice came back from `deepseek-v4-pro` as a proper `tool_use`, with the cache counts at zero. `claude-sonnet` and `claude-haiku` map to `deepseek-flash`. The key waits in `DEEPSEEK_API_KEY` in `~/.secrets.env` for a page to sit beside.",
    },
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

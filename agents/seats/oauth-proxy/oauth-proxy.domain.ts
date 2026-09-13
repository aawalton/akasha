import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const oauthProxy = {
  id: "01a08866-3c3f-734b-a28f-34e79b39e012",
  type: "domain",
  slug: "oauth-proxy",
  definition: "the proxy a seat's client reaches Anthropic through",
  parts: [
    "module/supervisor-proxy-adoption-rule",
    "module/supervisor-proxy-liveness",
    "module/supervisor-proxy-liveness-rule",
    "module/supervisor-proxy-ownership",
    "module/supervisor-proxy-port-line",
    "module/supervisor-proxy-version",
    "module/supervisor-spawn-oauth-proxy",
  ],
} as const satisfies Domain

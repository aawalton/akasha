import type { Domain } from "@akasha/domain-system/domain"

export const modelGateway = {
  id: "01a06227-7bc1-72a3-8056-41b5ba88f99d",
  pageTypeSlug: "domain",
  slug: "model-gateway",
  definition: "what sits between an agent and the model it is asking",
  partSlugs: [
    "module/bind-with-retry",
    "module/committed-outcome",
    "module/keepalive",
    "module/proxy-headers",
    "module/queue-step",
    "module/sse-error-frame",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A gateway serves one seat.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway holds the credentials the seat never sees.",
    },
    {
      invariantKind: "constraint",
      statement: "One thread carries every stream a gateway holds open.",
    },
    {
      invariantKind: "departure",
      statement: "Work a gateway does between two frames is work no stream is being served during.",
    },
  ],
} as const satisfies Domain

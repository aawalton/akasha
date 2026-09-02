import type { Domain } from "@akasha/domain-system/domain"

export const modelGateway = {
  id: "01a06227-7bc1-72a3-8056-41b5ba88f99d",
  pageTypeSlug: "domain",
  slug: "model-gateway",
  definition: "what sits between an agent and the model it is asking",
  partSlugs: [
    "module/anthropic-error-envelope",
    "module/bind-with-retry",
    "module/capacity-classification",
    "module/client-stream",
    "module/committed-outcome",
    "module/fable-fallback",
    "module/fast-mode-strip",
    "module/hold-registry",
    "module/idle-timeout",
    "module/keepalive",
    "module/model-unavailable",
    "module/oauth-types",
    "module/parse-boot-env",
    "module/parse-error-type",
    "module/permission-denied",
    "module/proxy-headers",
    "module/queue-step",
    "module/retry",
    "module/server-error",
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

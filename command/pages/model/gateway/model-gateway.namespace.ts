import type { Namespace } from "akasha/command/namespaces/namespace.page-type.types.ts"

export const modelGateway = {
  id: "01a07c0e-f3e6-7abc-9238-d49d16577a96",
  type: "namespace",
  slug: "model-gateway",
  definition: "the model gateway a seat runs, started, weighed or swapped",
  parts: [
    "command/model-gateway-start",
    "command/model-gateway-status",
    "command/model-gateway-swap",
    "module/live-gateway-seat",
  ],
  name: "gateway",
} as const satisfies Namespace

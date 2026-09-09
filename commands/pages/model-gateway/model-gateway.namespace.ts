import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const modelGateway = {
  id: "01a07c0e-f3e6-7abc-9238-d49d16577a96",
  pageTypeSlug: "namespace",
  slug: "model-gateway",
  definition: "the model gateway a seat runs, started, weighed or swapped",
  parts: [
    "command/model-gateway-start",
    "command/model-gateway-status",
    "command/model-gateway-swap",
  ],
} as const satisfies Namespace

import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const infrastructureService = {
  id: "01a0940a-15ff-7e3e-8ad9-8be0509a9a8a",
  type: "namespace",
  slug: "infrastructure-service",
  definition: "akasha's own service units, and the code one of them runs",
  name: "service",
  parts: [
    "command/infrastructure-service-restart",
    "command/infrastructure-service-run",
    "command/infrastructure-service-start",
    "command/infrastructure-service-stop",
    "command/infrastructure-service-sweep",
    "module/service-unit-asking",
  ],
} as const satisfies Namespace

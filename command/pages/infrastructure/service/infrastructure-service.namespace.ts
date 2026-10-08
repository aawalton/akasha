import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const infrastructureService = {
  id: "01a0940a-15ff-7e3e-8ad9-8be0509a9a8a",
  type: "page-type/namespace",
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
    "command/infrastructure-service-bundle",
  ],
  createdAt: "2026-09-12T05:14:44.095Z",
  updatedAt: "2026-09-22T15:03:20.000Z",
} as const satisfies Namespace

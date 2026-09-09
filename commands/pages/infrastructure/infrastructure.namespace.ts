import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const infrastructure = {
  id: "01a082ff-e445-73eb-9403-ca14a339ec8d",
  pageTypeSlug: "namespace",
  slug: "infrastructure",
  definition: "the machines, the services on them, and what puts code onto them",
  parts: [
    "command/infrastructure-deploy",
    "command/infrastructure-dev-server",
    "command/infrastructure-loki",
    "command/infrastructure-service",
    "command/infrastructure-shell-init-bash",
  ],
} as const satisfies Namespace

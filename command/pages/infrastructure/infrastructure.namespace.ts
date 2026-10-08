import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const infrastructure = {
  id: "01a082ff-e445-73eb-9403-ca14a339ec8d",
  type: "page-type/namespace",
  slug: "infrastructure",
  definition: "the machines, the services on them, and what puts code onto them",
  parts: [
    "command/infrastructure-loki",
    "command/infrastructure-shell-init-bash",
    "namespace/infrastructure-dev-server",
    "namespace/infrastructure-service",
    "command/infrastructure-provisioned-file-install",
  ],
  name: "infrastructure",
  createdAt: "2026-09-08T21:50:03.333Z",
  updatedAt: "2026-09-22T14:10:58.000Z",
} as const satisfies Namespace

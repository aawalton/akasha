import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const infrastructureDevServer = {
  id: "01a09406-1772-7273-b7a0-e3d2563134c0",
  type: "page-type/namespace",
  slug: "infrastructure-dev-server",
  definition: "one app's dev server on the tree of a commit",
  name: "dev-server",
  parts: [
    "command/infrastructure-dev-server-bootstrap",
    "command/infrastructure-dev-server-log",
    "command/infrastructure-dev-server-restart",
    "command/infrastructure-dev-server-start",
    "command/infrastructure-dev-server-status",
    "command/infrastructure-dev-server-stop",
    "module/dev-server-running",
  ],
} as const satisfies Namespace

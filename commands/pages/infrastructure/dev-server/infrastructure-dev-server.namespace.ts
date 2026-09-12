import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const infrastructureDevServer = {
  id: "01a09406-1772-7273-b7a0-e3d2563134c0",
  type: "namespace",
  slug: "infrastructure-dev-server",
  definition: "one app's dev server in a branch's worktree",
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

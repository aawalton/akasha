import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const talos = {
  id: "01a07bc6-efe9-76cc-91ba-f1df9bbe9e0a",
  type: "namespace",
  slug: "talos",
  definition: "the operating system the cluster's machines run",
  parts: [
    "command/talos-apply",
    "command/talos-bootstrap",
    "command/talos-config-gen",
    "command/talos-health",
    "command/talos-image-build",
    "command/talos-kubeconfig",
    "command/talos-remote-install",
    "command/talos-secret-gen",
  ],
  name: "talos",
} as const satisfies Namespace

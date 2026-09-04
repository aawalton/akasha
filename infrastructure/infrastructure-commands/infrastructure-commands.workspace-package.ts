import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const infrastructureCommands = {
  id: "01a06809-a024-78cb-a37f-ff53624d76bd",
  pageTypeSlug: "workspace-package",
  slug: "infrastructure-commands",
  definition: "what an agent runs by name over what the system runs on",
  manifest: "json",
  partSlugs: [
    "command/cluster-rbac-manifest",
    "command/talos-apply",
    "command/talos-bootstrap",
    "command/talos-config-gen",
    "command/talos-health",
    "command/talos-image-build",
    "command/talos-kubeconfig",
    "command/talos-remote-install",
    "command/talos-secrets-gen",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "gap",
      statement: "The Talos code a command here works over is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The RBAC rules a command here reads are in akasha.",
    },
  ],
} as const satisfies WorkspacePackage

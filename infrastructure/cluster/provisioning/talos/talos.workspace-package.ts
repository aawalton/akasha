import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const talos = {
  id: "01a06813-7b0e-79e0-ae0d-60b8f8c4a138",
  pageTypeSlug: "workspace-package",
  slug: "talos",
  definition: "the Talos machine configuration a cluster's nodes are declared in",
  manifest: "json",
  partSlugs: [
    "module/talos-build-patch",
    "module/talos-build-schematic",
    "module/talos-build-volumes",
    "module/emit-yaml",
    "module/factory",
    "module/talos-kubectl",
    "module/nodes",
    "module/nodes-main",
    "module/nodes-rehearsal",
    "module/paths",
    "module/talos-registry-ca",
    "module/schema",
    "module/talos-sops",
    "module/talos-ssh",
    "module/talos-wait-for-port",
    "module/talosctl",
  ],
} as const satisfies WorkspacePackage

import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const talos = {
  id: "01a06813-7b0e-79e0-ae0d-60b8f8c4a138",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "talos",
  definition: "the Talos machine configuration a cluster's nodes are declared in",
  parts: [
    "module/build-patch",
    "module/build-schematic",
    "module/build-volumes",
    "module/emit-yaml",
    "module/factory",
    "module/kubectl",
    "module/nodes",
    "module/nodes-main",
    "module/nodes-rehearsal",
    "module/paths",
    "module/registry-ca",
    "module/schema",
    "module/sops",
    "module/ssh",
    "module/wait-for-port",
    "module/talosctl",
  ],
} as const satisfies Domain

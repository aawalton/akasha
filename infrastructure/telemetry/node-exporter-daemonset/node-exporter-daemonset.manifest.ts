import type { Manifest } from "@akasha/k8s-types/manifest"

export const nodeExporterDaemonset = {
  id: "01a07390-ce05-777e-ac13-7b3f78051162",
  pageTypeSlug: "manifest",
  slug: "node-exporter-daemonset",
  definition:
    "the daemon set publishing each node's processor, memory, disk and network as metrics",
  code: "ts",
} as const satisfies Manifest

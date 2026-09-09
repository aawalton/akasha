import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const nodeExporterDaemonset = {
  id: "01a07390-ce05-777e-ac13-7b3f78051162",
  pageTypeSlug: "manifest",
  slug: "node-exporter-daemonset",
  definition:
    "the daemon set publishing each node's processor, memory, disk and network as metrics",
  parts: [
    "module/cgroup-psi-collector",
    "module/cgroup-psi-constants",
    "module/kubepods-oom-constants",
  ],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest

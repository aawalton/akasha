import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const prometheus = {
  id: "01a07398-73c3-7425-83fd-0ccdc373d439",
  pageTypeSlug: "manifest",
  slug: "prometheus",
  definition:
    "the metrics server, its namespace, its access rules, its storage, its configuration and its way in",
  parts: ["module/prometheus-config", "module/prometheus-manifests"],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest

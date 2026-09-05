import type { Manifest } from "@akasha/k8s-types/manifest"

export const prometheus = {
  id: "01a07398-73c3-7425-83fd-0ccdc373d439",
  pageTypeSlug: "manifest",
  slug: "prometheus",
  definition:
    "the metrics server, its namespace, its access rules, its storage, its configuration and its way in",
  code: "ts",
} as const satisfies Manifest

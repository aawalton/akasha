import type { Manifest } from "@akasha/k8s-types/manifest"

export const headscaleConfigmaps = {
  id: "01a06810-1262-7808-9512-ab1918128820",
  pageTypeSlug: "manifest",
  slug: "headscale-configmaps",
  definition: "the config maps holding the coordination server's settings and access rules",
  code: "ts",
} as const satisfies Manifest

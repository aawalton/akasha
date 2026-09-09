import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const ddnsHeadscale = {
  id: "01a0738a-4c62-7fa1-8bea-d9519b63d846",
  pageTypeSlug: "manifest",
  slug: "ddns-headscale",
  definition: "the namespace and cron job that point a public name at the current address",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest

import type { Manifest } from "@akasha/k8s-types/manifest"

export const ddnsHeadscale = {
  id: "01a0738a-4c62-7fa1-8bea-d9519b63d846",
  pageTypeSlug: "manifest",
  slug: "ddns-headscale",
  definition: "the namespace and cron job that point a public name at the current address",
  code: "ts",
} as const satisfies Manifest

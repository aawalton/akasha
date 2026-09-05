import type { Manifest } from "@akasha/k8s-types/manifest"

export const podJanitor = {
  id: "01a07391-4a2e-7350-bb33-6715d67b40a3",
  pageTypeSlug: "manifest",
  slug: "pod-janitor",
  definition: "the cron job that removes a failed pod its controller left behind",
  code: "ts",
} as const satisfies Manifest

import type { Manifest } from "@akasha/k8s-types/manifest"

export const registryGc = {
  id: "01a0738b-7f1f-7b3e-9dfb-d5f74f87561c",
  pageTypeSlug: "manifest",
  slug: "registry-gc",
  definition: "the cron job that removes an image layer nothing refers to",
  code: "ts",
} as const satisfies Manifest

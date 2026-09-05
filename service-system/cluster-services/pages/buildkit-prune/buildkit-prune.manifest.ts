import type { Manifest } from "@akasha/k8s-types/manifest"

export const buildkitPrune = {
  id: "01a0734e-7520-72cd-8753-812f4e1f1a93",
  pageTypeSlug: "manifest",
  slug: "buildkit-prune",
  definition: "the cron job that clears the builder's unused cache",
  code: "ts",
} as const satisfies Manifest

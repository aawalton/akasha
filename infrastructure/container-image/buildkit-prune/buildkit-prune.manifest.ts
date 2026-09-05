import type { Manifest } from "@akasha/k8s-types/manifest"

export const buildkitPrune = {
  id: "01a0737c-c2fe-7f6b-8abb-9b394a3320e5",
  pageTypeSlug: "manifest",
  slug: "buildkit-prune",
  definition: "the cron job that clears the builder's unused cache",
  code: "ts",
} as const satisfies Manifest

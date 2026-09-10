import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const buildkitPrune = {
  id: "01a0737c-c2fe-7f6b-8abb-9b394a3320e5",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "buildkit-prune",
  definition: "the cron job that clears the builder's unused cache",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest

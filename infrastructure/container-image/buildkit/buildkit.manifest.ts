import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const buildkit = {
  id: "01a07383-de17-7590-8580-ccd38e33ccd8",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "buildkit",
  definition: "the deployment running the builder that turns a Dockerfile into an image",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest

import type { Manifest } from "@akasha/k8s-types/manifest"

export const buildkit = {
  id: "01a07383-de17-7590-8580-ccd38e33ccd8",
  pageTypeSlug: "manifest",
  slug: "buildkit",
  definition: "the deployment running the builder that turns a Dockerfile into an image",
  code: "ts",
} as const satisfies Manifest

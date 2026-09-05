import type { Manifest } from "@akasha/k8s-types/manifest"

export const postgrest = {
  id: "01a07388-0aab-752f-88b5-67dfc8f38a5c",
  pageTypeSlug: "manifest",
  slug: "postgrest",
  definition: "the namespace, deployment and service serving the database's tables over HTTP",
  code: "ts",
} as const satisfies Manifest

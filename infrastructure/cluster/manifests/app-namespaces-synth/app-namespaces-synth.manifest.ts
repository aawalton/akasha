import type { Manifest } from "../../k8s-types/manifests/manifest.page-type.types.ts"

export const appNamespacesSynth = {
  id: "01a06810-1262-75ee-aa84-9009c06798cf",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "app-namespaces-synth",
  definition: "the namespaces the cluster has one application in each of",
  code: "ts",
} as const satisfies Manifest

import type { Module } from "@akasha/code-system/module"

export const k8sManifestScanner = {
  id: "01a06735-dd9c-7005-ad0d-1dd252bd10cf",
  pageTypeSlug: "module",
  slug: "k8s-manifest-scanner",
  definition: "what a Kubernetes manifest holds, read from its text",
  code: "ts",
} as const satisfies Module

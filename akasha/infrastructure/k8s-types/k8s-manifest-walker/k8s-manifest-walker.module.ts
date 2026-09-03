import type { Module } from "@akasha/code-system/module"

export const k8sManifestWalker = {
  id: "01a06735-dd9c-7006-89aa-ce3fbc8db31d",
  pageTypeSlug: "module",
  slug: "k8s-manifest-walker",
  definition: "the lines, documents and blocks a YAML manifest is read as",
  code: "ts",
} as const satisfies Module

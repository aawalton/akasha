import type { Module } from "@akasha/code-system/module"

export const manifestYamlReading = {
  id: "01a06860-955d-7022-968a-8fb96920cf58",
  pageTypeSlug: "module",
  slug: "manifest-yaml-reading",
  definition:
    "the kinds and cluster-scoped names a yaml manifest declares, read without a yaml parser",
  code: "ts",
} as const satisfies Module

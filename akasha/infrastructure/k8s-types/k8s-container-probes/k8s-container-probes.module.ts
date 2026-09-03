import type { Module } from "@akasha/code-system/module"

export const k8sContainerProbes = {
  id: "01a06735-dd9c-7003-8196-7db53f7b76dd",
  pageTypeSlug: "module",
  slug: "k8s-container-probes",
  definition: "the memory probes and resources a container declares",
  code: "ts",
} as const satisfies Module

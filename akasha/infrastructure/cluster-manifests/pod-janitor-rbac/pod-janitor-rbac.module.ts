import type { Module } from "@akasha/code-system/module"

export const podJanitorRbac = {
  id: "01a06860-955d-700f-b672-d9a5fed4b38a",
  pageTypeSlug: "module",
  slug: "pod-janitor-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the pod-janitor namespace",
  code: "ts",
} as const satisfies Module

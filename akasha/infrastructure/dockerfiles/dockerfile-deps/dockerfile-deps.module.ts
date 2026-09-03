import type { Module } from "@akasha/code-system/module"

export const dockerfileDeps = {
  id: "01a06865-abff-7003-ac73-432f836f70c1",
  pageTypeSlug: "module",
  slug: "dockerfile-deps",
  definition: "the workspace packages a service depends on, declared and transitive",
  code: "ts",
} as const satisfies Module

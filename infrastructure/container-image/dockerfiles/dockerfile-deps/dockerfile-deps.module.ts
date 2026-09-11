import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dockerfileDeps = {
  id: "01a06865-abff-7003-ac73-432f836f70c1",
  type: "module",
  slug: "dockerfile-deps",
  definition: "the package name each workspace folder publishes",
  code: "ts",
} as const satisfies Module

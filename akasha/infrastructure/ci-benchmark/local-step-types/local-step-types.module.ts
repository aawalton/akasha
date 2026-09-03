import type { Module } from "@akasha/code-system/module"

export const localStepTypes = {
  id: "01a068dd-71dc-753e-a711-f84272ef88db",
  pageTypeSlug: "module",
  slug: "local-step-types",
  definition:
    "the shape of a step, its context and what it answers, as the local runner reads them",
  code: "ts",
} as const satisfies Module

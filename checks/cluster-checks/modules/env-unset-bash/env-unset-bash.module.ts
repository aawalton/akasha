import type { Module } from "@akasha/code/module"

export const envUnsetBash = {
  id: "01a08169-7712-751f-beb7-d13851432422",
  pageTypeSlug: "module",
  slug: "env-unset-bash",
  definition: "the `env -u` invocations a bash startup file undoes the unsetting for",
  code: "ts",
} as const satisfies Module

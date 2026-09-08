import type { Module } from "@akasha/code/module"

export const cliJsonContractCoupling = {
  id: "01a08165-0bd7-71cd-a84b-867ea9d3d8b5",
  pageTypeSlug: "module",
  slug: "cli-json-contract-coupling",
  definition:
    "the strict Zod contracts a CI-excluded test reads, and what each is typechecked against",
  code: "ts",
} as const satisfies Module

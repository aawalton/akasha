import type { Module } from "../code-system/module/module.page-type.ts"

export const witnessNotAsserted = {
  id: "01a04a20-6e05-7935-be22-717714a08172",
  pageTypeSlug: "module",
  slug: "witness-not-asserted",
  definition: "the check refusing a witness obtained by assertion",
  code: "ts",
  requiredReadingSlugs: ["domain/akasha-check", "domain/akasha-type"],
  design: [
    "A witness type is found by the unexported unique symbol its module declares, never by a list kept beside it.",
    "Outside the module that declares it, a witness type is never the target of an assertion.",
  ],
} as const satisfies Module

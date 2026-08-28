import type { Module } from "../code-system/module/module.page-type.ts"

export const calling = {
  id: "01a04a6c-3b21-7000-9c4e-2f5a1d0c8e44",
  pageTypeSlug: "module",
  slug: "calling",
  definition: "a call from outside answered by the command it names",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["command", "corpus"],
  design: [
    "Everything akasha cannot reach for itself arrives as one argument.",
    "A seat that identifies nobody is carried as nobody.",
    "A command's page and its export cannot drift apart.",
  ],
} as const satisfies Module

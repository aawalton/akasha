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
    "A command is found by resolving its slug against the pages, so nothing lists the commands twice.",
    "Everything akasha cannot reach for itself arrives as one argument, so the boundary is a value rather than a lookup.",
    "A seat that identifies nobody is carried as nobody, and the command decides what that costs.",
    "A command's code answers to the name its page carries, so the page and the export cannot drift apart.",
  ],
} as const satisfies Module

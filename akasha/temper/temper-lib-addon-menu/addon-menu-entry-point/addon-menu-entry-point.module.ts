import type { Module } from "@akasha/code-system/module"

export const addonMenuEntryPoint = {
  id: "01a06100-0000-7000-8000-000000000004",
  pageTypeSlug: "module",
  slug: "addon-menu-entry-point",
  definition: "the sole import that names the published surface",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No code runs here beyond the import itself.",
    },
    {
      invariantKind: "constraint",
      statement: "The file is one line long.",
    },
  ],
} as const satisfies Module

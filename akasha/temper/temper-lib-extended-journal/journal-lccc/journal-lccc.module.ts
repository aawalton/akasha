import type { Module } from "@akasha/code-system/module"

export const journalLccc = {
  id: "01a0617d-5450-7ad0-a8e0-924df3500d6f",
  pageTypeSlug: "module",
  slug: "journal-lccc",
  definition: "the codes library this add-on carries and leaves in the global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A copy already loaded at the same version or newer is left alone.",
    },
  ],
} as const satisfies Module

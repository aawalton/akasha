import type { Module } from "@akasha/code-system/module"

export const libSetsKbfDlcFilter = {
  id: "01a0623e-53a1-7955-ac07-165fbac5661b",
  pageTypeSlug: "module",
  slug: "lib-sets-kbf-dlc-filter",
  definition: "the dropdown of DLCs a set can come from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter builds its own scrollable menu instead of taking the shared one.",
    },
    {
      invariantKind: "constraint",
      statement: "Entries sort by name or by release date according to the saved setting.",
    },
  ],
} as const satisfies Module

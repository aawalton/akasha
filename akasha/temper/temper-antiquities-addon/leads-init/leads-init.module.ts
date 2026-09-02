import type { Module } from "@akasha/code-system/module"

export const leadsInit = {
  id: "01a06274-b08a-713c-8263-d0c81956cd55",
  pageTypeSlug: "module",
  slug: "leads-init",
  definition: "the lead window's one-time setup",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The window is built hidden and shown only when asked for.",
    },
    {
      invariantKind: "constraint",
      statement: "Every control reached here is declared by the markup rather than by code.",
    },
  ],
} as const satisfies Module

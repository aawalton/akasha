import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatMode = {
  id: "01a064c8-9a9c-7a5f-8924-880a9eff5f02",
  pageTypeSlug: "module",
  slug: "seat-mode",
  definition: "the two ways a seat runs, and the zod schema admitting one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat mode is interactive or headless.",
    },
    {
      invariantKind: "departure",
      statement: "The seat mode type is inferred from the zod schema.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which mode a seat runs in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a mode a seat falls back to.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonGlobalOwnership = {
  id: "01a06351-9b09-79b9-9375-0365c78e88d8",
  pageTypeSlug: "module",
  slug: "addon-global-ownership",
  definition: "which port writes which Lua global, and where two ports claim one",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Exactly one port owns a global.",
    },
    {
      invariantKind: "constraint",
      statement: "Assigning to a global table claims the name.",
    },
    {
      invariantKind: "constraint",
      statement: "Reading a global table claims nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "A saved-variables entry claims its name as a write does.",
    },
    {
      invariantKind: "constraint",
      statement: "A local bound at any depth to a global table is a global table.",
    },
    {
      invariantKind: "departure",
      statement: "A claim is read off the syntax rather than off a run.",
    },
  ],
} as const satisfies Module

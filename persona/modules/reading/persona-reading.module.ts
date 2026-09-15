import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaReading = {
  id: "01a06949-b280-754e-ac40-fe17b061a1af",
  type: "module",
  slug: "persona-reading",
  definition:
    "persona pages read back as who she is, with her portrait file, and her last message time kept",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty set of personas is an error rather than a cast of nobody.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Personas come back sorted by slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A portrait named with no file beside the page raises an error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The domain a persona champions reads back to her slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain and a role read back as the slug alone, whatever page type names it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A display name is the slug with its first letter upper case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A last message time longer than twenty-four characters is refused.",
    },
  ],
} as const satisfies Module

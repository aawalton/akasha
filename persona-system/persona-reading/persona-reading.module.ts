import type { Module } from "@akasha/code-system/module"

export const personaReading = {
  id: "01a06949-b280-754e-ac40-fe17b061a1af",
  pageTypeSlug: "module",
  slug: "persona-reading",
  definition:
    "persona pages read back as who she is, with her portrait file and her last message time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty set of personas is an error rather than a cast of nobody.",
    },
    {
      invariantKind: "departure",
      statement: "Personas come back sorted by slug.",
    },
    {
      invariantKind: "departure",
      statement: "A portrait named with no file beside the page raises an error.",
    },
    {
      invariantKind: "departure",
      statement: "The domain a persona champions reads back to her slug.",
    },
    {
      invariantKind: "departure",
      statement: "A display name is the slug with its first letter upper case.",
    },
    {
      invariantKind: "departure",
      statement: "A last message time longer than twenty-four characters is refused.",
    },
  ],
} as const satisfies Module

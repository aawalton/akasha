import type { Module } from "@akasha/code-system/module"

export const domainStanding = {
  id: "01a06949-b280-73e9-9ded-65530eee9efa",
  pageTypeSlug: "module",
  slug: "domain-standing",
  definition:
    "every domain page in a repo read back as frontmatter fields, with parents from part slugs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is read for every page type that descends from domain.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose file will not load is left out rather than raising an error.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no slug or no page type slug is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A field key written in camel case comes back in kebab case.",
    },
    {
      invariantKind: "departure",
      statement: "A page's parents are the pages whose part slugs name it.",
    },
    {
      invariantKind: "departure",
      statement: "The reading for a root is done once and reused.",
    },
  ],
} as const satisfies Module

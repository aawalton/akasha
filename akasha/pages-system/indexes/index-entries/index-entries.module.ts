import type { Module } from "@akasha/code-system/module"

export const indexEntries = {
  id: "01a04b79-16c5-70d4-884a-66c95ddbec0d",
  pageTypeSlug: "module",
  slug: "index-entries",
  definition: "the entries a page's value implies",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page states its own path and the file each file property of the page names.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims everything the page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file property is filed under the key a page carries rather than under its slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page claims the sops file beside the page only where the page's type declares a secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type declares an uncommitted value claims the uncommitted file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "The naming grammar lets no other page claim either file.",
    },
    {
      invariantKind: "departure",
      statement: "A type declares what every type above that type declares.",
    },
    {
      invariantKind: "departure",
      statement: "Which types declare a secret is answered here rather than by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims an entry shape's file as the page claims a file property's file.",
    },
    {
      invariantKind: "departure",
      statement: "Which properties are entry shapes is answered here rather than by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A file that a page claims without stating is not asked to stand.",
    },
  ],
} as const satisfies Module

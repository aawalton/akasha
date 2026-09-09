import type { Module } from "@akasha/code/module"

export const targetKinding = {
  id: "01a08251-3c27-7aaa-b035-a2345ee394a0",
  pageTypeSlug: "module",
  type: "module",
  slug: "target-kinding",
  definition: "the change target subtype a path is under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under a page name is read as that page's own kind.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a `page-type` name is a page type before it is a page.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a page property name is a page property before it is a page.",
    },
    {
      invariantKind: "departure",
      statement: "Every other TypeScript path is code.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path is a file and nothing narrower.",
    },
    {
      invariantKind: "departure",
      statement: "The kind answered is the slug of the change target subtype naming it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here picks the change reached for a kind.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module

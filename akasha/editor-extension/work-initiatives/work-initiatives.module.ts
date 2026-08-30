import type { Module } from "../../code-system/module/module.page-type.ts"

export const workInitiatives = {
  id: "01a04e9f-4572-7339-8438-7d5a5777f8ab",
  pageTypeSlug: "module",
  slug: "work-initiatives",
  definition: "every initiative the work panel draws, and the one each stands under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative's slug is read off its file's name rather than out of its page.",
    },
    {
      invariantKind: "departure",
      statement: "A parent is answered as a slug.",
    },
    {
      invariantKind: "departure",
      statement: "The index files that edge by id while the tree is built from slugs.",
    },
    {
      invariantKind: "departure",
      statement: "The index files a parent edge under the parent.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative standing under other than one parent is answered as under none.",
    },
    {
      invariantKind: "departure",
      statement: "A persona is read out of the page.",
    },
    {
      invariantKind: "departure",
      statement: "The index files identities and edges and no text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the corpus.",
    },
    {
      invariantKind: "absence",
      statement: "Every initiative answered is one the index named first.",
    },
  ],
} as const satisfies Module

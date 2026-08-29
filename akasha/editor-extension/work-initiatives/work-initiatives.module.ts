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
      statement:
        "A parent is answered as a slug, because the index files that edge by id while the tree is built from slugs.",
    },
    {
      invariantKind: "departure",
      statement:
        "The index files a parent edge under the parent, so an initiative's own parent is found by listing what each initiative is named by rather than by reading what it names.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative standing under other than one parent is answered as under none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona is read out of the page, because the index files identities and edges and no text.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here walks the corpus. Every initiative answered is one the index named first.",
    },
  ],
} as const satisfies Module

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
      statement: "An initiative naming other than one parent is answered as standing under none.",
    },
    {
      invariantKind: "absence",
      statement:
        "No page is opened, so a value the index does not file is not answered here. A persona is one such value.",
    },
  ],
} as const satisfies Module

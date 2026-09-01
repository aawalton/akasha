import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const pagesQuery = {
  id: "01a05aec-eaaa-785b-b175-87946b2c2eb7",
  pageTypeSlug: "workspace-package",
  slug: "pages-query",
  definition: "the page store reached over HTTP by what runs outside it",
  manifest: "json",
  partSlugs: [
    "module/store-page-asking",
    "module/store-questioning",
    "module/store-reaching",
    "module/store-writing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "It stands in for the deleted `@shared/pages-query`.",
    },
    {
      invariantKind: "departure",
      statement: "A caller keeps the name and the signature it already spells.",
    },
    {
      invariantKind: "departure",
      statement: "A question the store cannot answer is refused rather than answered as none.",
    },
    {
      invariantKind: "departure",
      statement: "A test the store does not run is run here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a page's file.",
    },
  ],
} as const satisfies WorkspacePackage

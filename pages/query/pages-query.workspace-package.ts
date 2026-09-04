import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesQuery = {
  id: "01a05aec-eaaa-785b-b175-87946b2c2eb7",
  pageTypeSlug: "workspace-package",
  slug: "pages-query",
  definition: "the page store reached over HTTP",
  manifest: "json",
  partSlugs: [
    "module/store-page-asking",
    "module/store-questioning",
    "module/store-reaching",
    "module/store-spelled-asking",
    "module/store-spelling",
    "module/store-writing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This package holds the store half of `@shared/pages-query` rather than the router.",
    },
    {
      invariantKind: "departure",
      statement: "A caller keeps the name and the signature the caller already spells.",
    },
    {
      invariantKind: "departure",
      statement: "A question the store cannot answer is refused rather than answered as nothing.",
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

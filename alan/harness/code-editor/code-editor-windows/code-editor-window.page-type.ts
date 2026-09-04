import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type CodeEditorWindow = Page

export const codeEditorWindow = {
  id: "01a06826-92e5-77ad-ad85-f1aa8cb5d359",
  pageTypeSlug: "page-type",
  slug: "code-editor-window",
  definition: "one open window of the editor",
  pluralSlug: "code-editor-windows",
  extendsSlug: ["page-type/page"],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A closed window's page, with the pages of its groups and tabs, goes in the hourly sweep rather than as the window closes.",
    },
  ],
} as const satisfies PageType

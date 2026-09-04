import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type CodeEditorGroupTab = Page

export const codeEditorGroupTab = {
  id: "01a06826-92e5-7347-826a-2896ea71b0ee",
  pageTypeSlug: "page-type",
  slug: "code-editor-group-tab",
  definition: "a single open item within a group",
  pluralSlug: "code-editor-group-tabs",
  extendsSlug: ["page-type/page"],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The next write takes the page of a tab closed while the tab's window is still open.",
    },
  ],
} as const satisfies PageType

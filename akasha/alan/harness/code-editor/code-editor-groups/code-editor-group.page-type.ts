import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type CodeEditorGroup = Page

export const codeEditorGroup = {
  id: "01a06826-92e5-7205-a945-38ff0c371a22",
  pageTypeSlug: "page-type",
  slug: "code-editor-group",
  definition: "a container of tabs, one of which is showing",
  pluralSlug: "code-editor-groups",
  extendsSlug: "page-type/page",
  partSlugs: ["page-type/code-editor-group-tab"],
  mortal: true,
} as const satisfies PageType

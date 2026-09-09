import type { PageType } from "@akasha/pages/page-type"

export const codeEditorGroup = {
  id: "01a06826-92e5-7205-a945-38ff0c371a22",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "code-editor-group",
  definition: "a container of tabs, one of which is showing",
  pluralSlug: "code-editor-groups",
  extends: ["page-type/page"],
  parts: ["page-type/code-editor-group-tab"],
  mortal: true,
  types: "ts",
} as const satisfies PageType

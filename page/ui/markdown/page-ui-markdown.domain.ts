import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiMarkdown = {
  id: "01a071cf-d60f-7945-8ae3-67e578d922b4",
  type: "page-type/domain",
  slug: "page-ui-markdown",
  definition: "how code shows a page's text on a screen",
  parts: [
    "module/markdown-renderer",
    "module/mention-chip",
    "module/remark-mentions",
    "module/remark-sectionize",
  ],
  createdAt: "2026-09-05T13:44:01.295Z",
  updatedAt: "2026-09-25T17:31:26.000Z",
} as const satisfies Domain

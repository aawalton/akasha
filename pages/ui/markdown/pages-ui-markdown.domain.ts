import type { Domain } from "@akasha/domains/domain"

export const pagesUiMarkdown = {
  id: "01a071cf-d60f-7945-8ae3-67e578d922b4",
  pageTypeSlug: "domain",
  slug: "pages-ui-markdown",
  definition: "markdown drawn for a reader",
  partSlugs: [
    "module/markdown-renderer",
    "module/mention-chip",
    "module/remark-mentions",
    "module/remark-sectionize",
  ],
} as const satisfies Domain

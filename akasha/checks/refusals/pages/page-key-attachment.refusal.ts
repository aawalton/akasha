import type { Refusal } from "../refusal.page-type.ts"

export const pageKeyAttachment = {
  id: "01a06611-3990-782d-bd8b-1fa5df2dbfbe",
  pageTypeSlug: "refusal",
  slug: "page-key-attachment",
  title: "Page key attachment",
  text: "`{key}` is an attachment on `{on}`, so its value stands in the file beside the page, never in frontmatter",
} as const satisfies Refusal

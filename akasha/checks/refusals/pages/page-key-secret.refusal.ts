import type { Refusal } from "../refusal.page-type.ts"

export const pageKeySecret = {
  id: "01a06611-3993-7d12-b5b0-79840eceaa95",
  pageTypeSlug: "refusal",
  slug: "page-key-secret",
  title: "Page key secret",
  text: "`{key}` is secret on `{on}`, so its value stands in the page's sops file, never in frontmatter",
} as const satisfies Refusal

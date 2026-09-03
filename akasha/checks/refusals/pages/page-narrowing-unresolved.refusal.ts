import type { Refusal } from "../refusal.page-type.ts"

export const pageNarrowingUnresolved = {
  id: "01a06611-3996-73a5-a78f-3791d8ce4cb5",
  pageTypeSlug: "refusal",
  slug: "page-narrowing-unresolved",
  title: "Page narrowing unresolved",
  text: "`{path}` states `narrows-slug: {narrows}`, and no page type it extends declares `{key}`.\n\nA narrowing names the declaration it narrows.",
} as const satisfies Refusal

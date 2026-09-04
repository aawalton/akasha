import type { Refusal } from "../refusal.page-type.ts"

export const pageBlockNarrowingUnresolved = {
  id: "01a06611-398e-78c1-bb84-671b5df5f4f7",
  pageTypeSlug: "refusal",
  slug: "page-block-narrowing-unresolved",
  title: "Page block narrowing unresolved",
  text: "`{path}` states `blocks.{key}.narrows: {narrows}`, and no page type it extends declares `blocks.{key}`.\n\nA narrowing names the declaration it narrows.",
} as const satisfies Refusal

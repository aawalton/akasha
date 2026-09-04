import type { Refusal } from "../refusal.page-type.ts"

export const pageRowRequiredDropped = {
  id: "01a06611-3999-783d-8ba6-ae80e9c6241f",
  pageTypeSlug: "refusal",
  slug: "page-row-required-dropped",
  title: "Page row required dropped",
  text: "`{key}` is required on `{on}` and this row already carries it, so this write would take it away — a `write-row` lands the whole row and drops every key it does not name. State `{key}` again to keep it, or use `patch-row`, which keeps what it does not name.",
} as const satisfies Refusal

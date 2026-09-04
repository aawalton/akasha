import type { Refusal } from "../refusal.page-type.ts"

export const pageSelectStatesNoValues = {
  id: "01a06611-399a-7600-89a3-ad040075a315",
  pageTypeSlug: "refusal",
  slug: "page-select-states-no-values",
  title: "Page select states no values",
  text: "`type: {states}` selects and this states no `values:`, so nothing says which values it admits.\n\nA `select(…)` stating no set is the type it wraps under a longer name.",
} as const satisfies Refusal

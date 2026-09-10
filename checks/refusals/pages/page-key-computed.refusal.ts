import type { Refusal } from "../refusal.page-type.types.ts"

export const pageKeyComputed = {
  id: "01a06611-3991-7f9a-9fb4-8f222bf361ee",
  pageTypeSlug: "refusal",
  type: "refusal",
  slug: "page-key-computed",
  title: "Page key computed",
  text: "states `{key}`, which `{on}` works out, and such a value is worked out as the page is read rather than kept in it",
} as const satisfies Refusal

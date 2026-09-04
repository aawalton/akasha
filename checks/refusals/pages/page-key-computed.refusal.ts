import type { Refusal } from "../refusal.page-type.ts"

export const pageKeyComputed = {
  id: "01a06611-3991-7f9a-9fb4-8f222bf361ee",
  pageTypeSlug: "refusal",
  slug: "page-key-computed",
  title: "Page key computed",
  text: "`{key}` is computed on `{on}`, so the engine supplies it and no file states it",
} as const satisfies Refusal

import type { Refusal } from "akasha/check/refusal/refusal.page-type.types.ts"

export const pageKeyComputed = {
  id: "01a06611-3991-7f9a-9fb4-8f222bf361ee",
  type: "page-type/refusal",
  slug: "page-key-computed",
  title: "Page key computed",
  text: "states `{key}`, which `{on}` works out, and such a value is worked out as the page is read rather than kept in it",
  createdAt: "2026-09-03T07:00:00.017Z",
  updatedAt: "2026-09-15T16:27:59.000Z",
} as const satisfies Refusal

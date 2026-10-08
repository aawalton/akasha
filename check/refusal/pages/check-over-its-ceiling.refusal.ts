import type { Refusal } from "akasha/check/refusal/refusal.page-type.types.ts"

export const checkOverItsCeiling = {
  id: "01a08bc2-733c-7796-9be5-c9a2c9ed9d98",
  type: "page-type/refusal",
  slug: "check-over-its-ceiling",
  title: "Check over its ceiling",
  text: "the check `{slug}` spent {spent} processor seconds judging this change, over the {ceiling} its page states, so what it judged does not land — take it to Alan to make the check faster or to raise the ceiling",
  createdAt: "2026-09-10T14:39:31.644Z",
  updatedAt: "2026-09-15T16:27:59.000Z",
} as const satisfies Refusal

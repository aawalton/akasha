import type { Refusal } from "../refusal.page-type.types.ts"

export const checkOverItsCeiling = {
  id: "01a08bc2-733c-7796-9be5-c9a2c9ed9d98",
  pageTypeSlug: "refusal",
  type: "refusal",
  slug: "check-over-its-ceiling",
  title: "Check over its ceiling",
  text: "the check `{slug}` spent {spent} processor seconds judging this change, over the {ceiling} its page states, so what it judged does not land — take it to Alan to make the check faster or to raise the ceiling",
} as const satisfies Refusal

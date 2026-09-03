import type { SelectProperty } from "@akasha/pages-system/select-property"

export const focus = {
  id: "01a0657a-e62d-7b35-94f4-44d27343d54f",
  pageTypeSlug: "select-property",
  slug: "focus",
  propertySlug: "focus",
  definition: "what the day trains",
  values: ["legs", "pull", "push", "rest"],
} as const satisfies SelectProperty

export type Focus = (typeof focus.values)[number]

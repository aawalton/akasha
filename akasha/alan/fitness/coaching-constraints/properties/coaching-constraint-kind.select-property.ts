import type { SelectProperty } from "@akasha/pages-system/select-property"

export const coachingConstraintKind = {
  id: "01a0657a-fe00-7149-b974-3ad13dd29e09",
  pageTypeSlug: "select-property",
  slug: "coaching-constraint-kind",
  propertySlug: "coaching-constraint-kind",
  definition: "what sort of limit the constraint is",
  values: [
    "medical-gate",
    "programming-cue",
    "equipment-ceiling",
    "injury-watch",
    "ef-accommodation",
  ],
} as const satisfies SelectProperty

export type CoachingConstraintKind = (typeof coachingConstraintKind.values)[number]

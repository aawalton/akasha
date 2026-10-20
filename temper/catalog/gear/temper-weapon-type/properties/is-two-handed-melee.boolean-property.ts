import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const isTwoHandedMelee = {
  id: "01a15ad8-12ec-76c2-8e33-924f547f65a8",
  type: "page-type/boolean-property",
  slug: "is-two-handed-melee",
  propertySlug: "is-two-handed-melee",
  definition: "whether a weapon is swung with both hands, which raises its power",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bow and a staff take both hands and are not two-handed melee.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon stating nothing here is not two-handed melee.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T19:44:32.491Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies BooleanProperty

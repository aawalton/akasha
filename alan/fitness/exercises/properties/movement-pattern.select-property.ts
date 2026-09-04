import type { SelectProperty } from "@akasha/pages-system/select-property"

export const movementPattern = {
  id: "01a0657e-2bbf-7dea-b8cd-ef434268cd50",
  pageTypeSlug: "select-property",
  slug: "movement-pattern",
  propertySlug: "movement-pattern",
  definition: "the shape of the movement, which is what a session is balanced across",
  values: [
    "carry",
    "conditioning",
    "core-anti-extension",
    "core-anti-lateral-flexion",
    "core-anti-rotation",
    "gait",
    "h-pull",
    "h-push",
    "hinge",
    "isolation-other",
    "lunge",
    "mobility",
    "squat",
    "v-pull",
    "v-push",
  ],
} as const satisfies SelectProperty

export type MovementPattern = (typeof movementPattern.values)[number]

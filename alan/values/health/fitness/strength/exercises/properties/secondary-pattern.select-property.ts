import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const secondaryPattern = {
  id: "01a0657e-2bc0-7adf-acea-1bc5294c147f",
  type: "select-property",
  slug: "secondary-pattern",
  propertySlug: "secondary-pattern",
  definition: "a second movement shape the exercise also trains",
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
  types: "ts",
} as const satisfies SelectProperty

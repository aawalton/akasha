import type { SelectProperty } from "@akasha/pages-system/select-property"

export const secondaryPattern = {
  id: "01a0657e-2bc0-7adf-acea-1bc5294c147f",
  pageTypeSlug: "select-property",
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
} as const satisfies SelectProperty

export type SecondaryPattern = (typeof secondaryPattern.values)[number]

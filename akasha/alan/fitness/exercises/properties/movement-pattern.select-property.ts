import type { SelectProperty } from "@akasha/pages-system/select-property"

export const movementPattern = {
  id: "01a0657b-1ad2-7045-b6bf-650c943180f4",
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

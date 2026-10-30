import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const secondaryPattern = {
  id: "01a0657e-2bc0-7adf-acea-1bc5294c147f",
  type: "page-type/select-property",
  slug: "secondary-pattern",
  propertySlug: "secondary-pattern",
  definition: "a second movement pattern a strength exercise trains",
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
  createdAt: "2026-09-03T04:19:22.688Z",
  updatedAt: "2026-10-30T16:58:11.212Z",
} as const satisfies SelectProperty

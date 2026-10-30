import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const movementPattern = {
  id: "01a0657e-2bbf-7dea-b8cd-ef434268cd50",
  type: "page-type/select-property",
  slug: "movement-pattern",
  propertySlug: "movement-pattern",
  definition: "the main shape of a strength exercise",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "movement pattern" },
    { partOfSpeech: "part-of-speech/noun", spelling: "movement patterns" },
  ],
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
  createdAt: "2026-09-03T04:19:22.687Z",
  updatedAt: "2026-10-30T16:57:41.317Z",
} as const satisfies SelectProperty

import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const aelwynPointsSource = {
  id: "01a060b8-bfb0-7001-969a-6d184f7d85a0",
  pageTypeSlug: "persona-points-source",
  slug: "aelwyn-points-source",
  definition: "Alan's strength volume and active calories",
  personaSlug: "aelwyn",
  kind: "direct",
  readings: ["strengthVolume:7", "activeCalories"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Seven pounds through one repetition is a point.",
    },
    {
      invariantKind: "departure",
      statement: "An active calorie is a point.",
    },
  ],
} as const satisfies PersonaPointsSource

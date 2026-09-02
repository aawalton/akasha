import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const nataliePointsSource = {
  id: "01a060b8-bfb0-700f-921b-f015e7f56db8",
  pageTypeSlug: "persona-points-source",
  slug: "natalie-points-source",
  definition: "the grams of whole plants Alan ate",
  personaSlug: "natalie",
  kind: "direct",
  readings: ["nutritionPoints"],
} as const satisfies PersonaPointsSource

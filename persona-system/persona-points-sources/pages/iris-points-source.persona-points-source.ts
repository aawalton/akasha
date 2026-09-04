import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const irisPointsSource = {
  id: "01a060b8-bfb0-700c-bb76-08bc115befe8",
  pageTypeSlug: "persona-points-source",
  slug: "iris-points-source",
  definition: "the words published in The Tower",
  personaSlug: "iris",
  kind: "external",
  marker: "tower-words",
} as const satisfies PersonaPointsSource

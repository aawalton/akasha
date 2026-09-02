import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const abbyPointsSource = {
  id: "01a060b8-bfb0-7000-bd37-84c2f9737642",
  pageTypeSlug: "persona-points-source",
  slug: "abby-points-source",
  definition: "the words written into the all-about-alan book",
  personaSlug: "abby",
  kind: "unavailable",
} as const satisfies PersonaPointsSource

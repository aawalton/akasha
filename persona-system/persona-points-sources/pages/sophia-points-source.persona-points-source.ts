import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const sophiaPointsSource = {
  id: "01a060b8-bfb0-7014-801b-34235e4ae0a4",
  pageTypeSlug: "persona-points-source",
  slug: "sophia-points-source",
  definition: "the messages Alan sends her",
  personaSlug: "sophia",
  kind: "manual",
} as const satisfies PersonaPointsSource

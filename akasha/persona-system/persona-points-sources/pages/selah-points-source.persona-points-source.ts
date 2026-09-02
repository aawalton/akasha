import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const selahPointsSource = {
  id: "01a060b8-bfb0-7012-a9ad-b441e0e25228",
  pageTypeSlug: "persona-points-source",
  slug: "selah-points-source",
  definition: "the minutes Alan spent praying",
  personaSlug: "selah",
  kind: "external",
} as const satisfies PersonaPointsSource

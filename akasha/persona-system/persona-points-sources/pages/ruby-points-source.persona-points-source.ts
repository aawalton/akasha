import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const rubyPointsSource = {
  id: "01a060b8-bfb0-7011-afa2-9b7ffd8a0eeb",
  pageTypeSlug: "persona-points-source",
  slug: "ruby-points-source",
  definition: "the minutes Alan spent with Jen",
  personaSlug: "ruby",
  kind: "external",
} as const satisfies PersonaPointsSource

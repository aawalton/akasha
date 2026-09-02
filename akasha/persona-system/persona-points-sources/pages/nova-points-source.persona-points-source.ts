import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const novaPointsSource = {
  id: "01a060b8-bfb0-7010-aa26-fc255af23795",
  pageTypeSlug: "persona-points-source",
  slug: "nova-points-source",
  definition: "the words Alan read",
  personaSlug: "nova",
  kind: "external",
  marker: "words-read",
} as const satisfies PersonaPointsSource

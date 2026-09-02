import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const zadiPointsSource = {
  id: "01a060b8-bfb0-7016-8f83-9f0f17859ee9",
  pageTypeSlug: "persona-points-source",
  slug: "zadi-points-source",
  definition: "the words in the Great Books chapters Alan finished",
  personaSlug: "zadi",
  kind: "external",
  marker: "gbww-chapter-completions",
} as const satisfies PersonaPointsSource

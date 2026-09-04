import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const shaestrelPointsSource = {
  id: "01a060b8-bfb0-7013-8f4d-e77e33f53161",
  pageTypeSlug: "persona-points-source",
  slug: "shaestrel-points-source",
  definition: "the messages Alan sends her",
  personaSlug: "shaestrel",
  kind: "windowed",
  marker: "appearance-experiment",
  aggregate: "count",
} as const satisfies PersonaPointsSource

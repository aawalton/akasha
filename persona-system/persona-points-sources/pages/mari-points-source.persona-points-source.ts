import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const mariPointsSource = {
  id: "01a060b8-bfb0-700e-bc5a-0ef928f790a5",
  pageTypeSlug: "persona-points-source",
  slug: "mari-points-source",
  definition: "the messages Alan sends her",
  personaSlug: "mari",
  kind: "seed",
} as const satisfies PersonaPointsSource

import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const ainePointsSource = {
  id: "01a060b8-bfb0-7002-9d3c-ef2edfc1dfc9",
  pageTypeSlug: "persona-points-source",
  slug: "aine-points-source",
  definition: "the messages Alan sends her",
  personaSlug: "aine",
  kind: "manual",
} as const satisfies PersonaPointsSource

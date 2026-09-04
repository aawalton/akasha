import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const zeliPointsSource = {
  id: "01a060b8-bfb0-7017-9bb7-3b69dcda754c",
  pageTypeSlug: "persona-points-source",
  slug: "zeli-points-source",
  definition: "the minutes Alan spent making art",
  personaSlug: "zeli",
  kind: "external",
} as const satisfies PersonaPointsSource

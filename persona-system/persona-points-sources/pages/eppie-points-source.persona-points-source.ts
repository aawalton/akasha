import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const eppiePointsSource = {
  id: "01a060b8-bfb0-7008-b386-9485d3bc61e7",
  pageTypeSlug: "persona-points-source",
  slug: "eppie-points-source",
  definition: "the minutes Alan spent listening to music he had never heard",
  personaSlug: "eppie",
  kind: "windowed",
  marker: "song-listen",
  aggregate: "sum",
  pointField: "newMusicMinutes",
} as const satisfies PersonaPointsSource

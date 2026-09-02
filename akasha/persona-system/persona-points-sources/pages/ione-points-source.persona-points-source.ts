import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const ionePointsSource = {
  id: "01a060b8-bfb0-700b-84a1-0be975ffb3d3",
  pageTypeSlug: "persona-points-source",
  slug: "ione-points-source",
  definition: "the minutes Alan slept",
  personaSlug: "ione",
  kind: "direct",
  readings: ["sleepPoints"],
} as const satisfies PersonaPointsSource

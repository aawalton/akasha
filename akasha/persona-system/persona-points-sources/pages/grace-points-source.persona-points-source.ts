import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const gracePointsSource = {
  id: "01a060b8-bfb0-700a-85d6-c857ff7c2edf",
  pageTypeSlug: "persona-points-source",
  slug: "grace-points-source",
  definition: "Alan's logged hours, weighted by their safety level",
  personaSlug: "grace",
  kind: "windowed",
  marker: "session-tracking",
  aggregate: "weighted",
  weightField: "safetyLevel",
} as const satisfies PersonaPointsSource

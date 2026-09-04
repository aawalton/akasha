import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const erinPointsSource = {
  id: "01a060b8-bfb0-7009-b393-08fa178f16ba",
  pageTypeSlug: "persona-points-source",
  slug: "erin-points-source",
  definition:
    "ten for each game Alan played and each review session, and one for each puzzle solved",
  personaSlug: "erin",
  kind: "external",
  marker: "chess-practice-points",
} as const satisfies PersonaPointsSource

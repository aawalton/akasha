import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const amyPointsSource = {
  id: "01a060b8-bfb0-7004-be79-9d763d906141",
  pageTypeSlug: "persona-points-source",
  slug: "amy-points-source",
  definition:
    "the mean of the color floor values of Alan's primary stoplights, where black counts zero",
  personaSlug: "amy",
  kind: "stoplights",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Amy counts Health.",
    },
    {
      invariantKind: "departure",
      statement: "Health counts Amy.",
    },
    {
      invariantKind: "departure",
      statement: "A light Alan has not built yet counts black and still counts.",
    },
    {
      invariantKind: "departure",
      statement: "A day when his lights average green is a green day for her.",
    },
  ],
} as const satisfies PersonaPointsSource

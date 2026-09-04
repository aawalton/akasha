import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const taliaPointsSource = {
  id: "01a060b8-bfb0-7015-a201-0fafa1593e80",
  pageTypeSlug: "persona-points-source",
  slug: "talia-points-source",
  definition: "the words written into the my-faith book",
  personaSlug: "talia",
  kind: "unavailable",
} as const satisfies PersonaPointsSource

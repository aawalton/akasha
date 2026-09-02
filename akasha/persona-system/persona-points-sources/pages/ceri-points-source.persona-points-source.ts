import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const ceriPointsSource = {
  id: "01a060b8-bfb0-7006-ab16-f6a041bc7d2c",
  pageTypeSlug: "persona-points-source",
  slug: "ceri-points-source",
  definition: "the minutes of anime Alan watched",
  personaSlug: "ceri",
  kind: "external",
  marker: "anime-episode-completions",
} as const satisfies PersonaPointsSource

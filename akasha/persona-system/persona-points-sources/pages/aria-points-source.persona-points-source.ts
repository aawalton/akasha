import type { PersonaPointsSource } from "../persona-points-source.page-type.ts"

export const ariaPointsSource = {
  id: "01a060b8-bfb0-7005-98f3-64a11bc40b6d",
  pageTypeSlug: "persona-points-source",
  slug: "aria-points-source",
  definition: "the words published in Dragons & Dungeons",
  personaSlug: "aria",
  kind: "external",
  marker: "story-chapter-words",
} as const satisfies PersonaPointsSource

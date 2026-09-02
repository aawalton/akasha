import type { Persona } from "../persona.page-type.ts"

export const claude = {
  id: "01a053c6-eb3c-7e88-9c2e-caf4de6fe72b",
  pageTypeSlug: "persona",
  slug: "claude",
  definition: "an agent working as itself, with no character authored over it",
} as const satisfies Persona

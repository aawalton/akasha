import type { Persona } from "akasha/persona/persona.page-type.types.ts"

export const claude = {
  id: "01a053c6-eb3c-7e88-9c2e-caf4de6fe72b",
  type: "page-type/persona",
  slug: "claude",
  definition: "an agent working as itself, with no character authored over it",
  createdAt: "2026-08-30T17:45:40.412Z",
  updatedAt: "2026-09-15T16:08:28.000Z",
} as const satisfies Persona

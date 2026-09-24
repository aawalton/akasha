import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const google = {
  id: "01a06349-515e-7000-8d93-797af6330d1d",
  type: "page-type/domain",
  slug: "google",
  definition: "what Alan keeps with Google, reached under a consent",
  parts: [
    "domain/google-calendar",
    "domain/google-company",
    "domain/google-drive",
    "domain/google-email",
    "domain/google-oauth",
  ],
} as const satisfies Domain

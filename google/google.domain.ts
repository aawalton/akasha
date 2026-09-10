import type { Domain } from "../domains/domain.page-type.types.ts"

export const google = {
  id: "01a06349-515e-7000-8d93-797af6330d1d",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "google",
  definition: "what Alan keeps with Google, reached under one consent",
  parts: [
    "domain/google-calendar",
    "domain/google-drive",
    "domain/google-email",
    "domain/google-oauth",
  ],
} as const satisfies Domain

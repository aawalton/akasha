import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const google = {
  id: "01a06349-515e-7000-8d93-797af6330d1d",
  type: "page-type/domain",
  slug: "google",
  definition: "what Alan stores with Google",
  parts: [
    "domain/google-calendar",
    "domain/google-company",
    "domain/google-drive",
    "domain/google-email",
    "domain/google-oauth",
    "domain/google-sheets",
  ],
  createdAt: "2026-09-02T18:02:24.478Z",
  updatedAt: "2026-10-14T13:53:45.733Z",
} as const satisfies Domain

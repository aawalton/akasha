import type { Domain } from "../domains/domain.page-type.ts"

export const google = {
  id: "01a06349-515e-7000-8d93-797af6330d1d",
  pageTypeSlug: "domain",
  slug: "google",
  definition: "what Alan keeps with Google, reached under one consent",
  partSlugs: [
    "workspace-package/google-calendar",
    "workspace-package/google-drive",
    "workspace-package/google-email",
    "workspace-package/google-oauth",
  ],
} as const satisfies Domain

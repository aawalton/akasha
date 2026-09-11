import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalFileContentAppend = {
  id: "01a08c37-3a63-732e-8729-c8a65910b807",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-file-content-append",
  definition: "a mechanical change putting content at the end of what a file holds",
  parts: ["change-mechanical-file-content/append-lines"],
} as const satisfies Domain

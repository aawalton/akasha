import type { Initiative } from "../initiative.page-type.ts"

export const aineAuditChangeGuards = {
  id: "01a07b9d-714b-7d47-a337-a59a3a5219b2",
  pageTypeSlug: "initiative",
  slug: "aine-audit-change-guards",
  domainSlug: "page-type/change",
  personaSlug: "aine",
  intents: [],
  constraints: [
    "A guard judges the answer a change gives, so what can be judged without that answer is a check.",
    "A guard runs on a mechanical change alone.",
    "A guard is named on the change page rather than reached by an import.",
    "Guards short-circuit, so the first refusal is the whole answer.",
  ],
} as const satisfies Initiative

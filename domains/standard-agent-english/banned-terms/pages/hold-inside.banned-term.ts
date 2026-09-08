import type { BannedTerm } from "../banned-term.page-type.ts"

export const holdInside = {
  id: "01a081fe-3ea9-770a-9afd-6d05c8f610b6",
  pageTypeSlug: "banned-term",
  slug: "hold-inside",
  spelling: "hold",
  definition: "what a thing has inside it",
  instead: "have",
} as const satisfies BannedTerm

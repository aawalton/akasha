import type { Domain } from "@akasha/domains/domain"

export const pagesCoreJsonPatch = {
  id: "01a071cb-06e1-77a7-9b87-356db476d706",
  pageTypeSlug: "domain",
  slug: "pages-core-json-patch",
  definition: "a change to a JSON value said as a patch",
  partSlugs: ["module/apply", "module/jsonb-ops"],
} as const satisfies Domain

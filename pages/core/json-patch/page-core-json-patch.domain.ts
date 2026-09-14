import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const pageCoreJsonPatch = {
  id: "01a071cb-06e1-77a7-9b87-356db476d706",
  type: "domain",
  slug: "page-core-json-patch",
  definition: "a change to a JSON value said as a patch",
  parts: ["module/apply", "module/jsonb-ops"],
} as const satisfies Domain

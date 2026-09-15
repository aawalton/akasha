import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiMutator = {
  id: "01a071d0-fbc9-77b5-bc90-c1df2358997e",
  type: "domain",
  slug: "page-ui-mutator",
  definition: "the callbacks a view changes through",
  parts: ["module/view-callbacks"],
} as const satisfies Domain

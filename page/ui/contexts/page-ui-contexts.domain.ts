import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiContexts = {
  id: "01a071cf-5cb5-7515-985b-9a9999073b99",
  type: "domain",
  slug: "page-ui-contexts",
  definition: "a value a React tree carries down",
  parts: ["module/page-resolver-context", "module/relation-picker-context"],
} as const satisfies Domain

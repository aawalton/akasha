import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiCache = {
  id: "01a071cf-25b5-79d7-8f2c-eabab6748229",
  type: "page-type/domain",
  slug: "page-ui-cache",
  definition: "how a component reads the pages a browser keeps",
  parts: [
    "module/boot-gate",
    "module/tanstack-live",
    "module/use-core-definitions-ready",
    "module/use-query",
    "module/use-view-query",
  ],
} as const satisfies Domain

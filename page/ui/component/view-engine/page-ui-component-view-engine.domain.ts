import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiComponentViewEngine = {
  id: "01a071d3-819f-77d0-818b-e7da6441196a",
  type: "page-type/domain",
  slug: "page-ui-component-view-engine",
  definition: "the rows a view draws on screen",
  parts: [
    "module/build-page-resolver",
    "module/generate-group-definitions",
    "module/use-page-view",
    "module/use-view-row-aggregates",
    "module/view-row",
  ],
} as const satisfies Domain

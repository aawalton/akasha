import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiComponentQuickAdd = {
  id: "01a071d3-63bd-7123-8d21-2d607ec892bb",
  type: "page-type/domain",
  slug: "page-ui-component-quick-add",
  definition: "a page made from a line of text",
  parts: [
    "module/compute-quick-add-payload",
    "module/parse-inline-tokens",
    "module/use-active-quick-add-page-type",
    "module/use-inline-completion",
  ],
} as const satisfies Domain

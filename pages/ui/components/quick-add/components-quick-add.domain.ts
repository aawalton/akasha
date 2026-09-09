import type { Domain } from "akasha/domains/domain.page-type.ts"

export const componentsQuickAdd = {
  id: "01a071d3-63bd-7123-8d21-2d607ec892bb",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "components-quick-add",
  definition: "a page made from one line of text",
  parts: [
    "module/compute-quick-add-payload",
    "module/parse-inline-tokens",
    "module/use-active-quick-add-page-type",
    "module/use-inline-completion",
  ],
} as const satisfies Domain

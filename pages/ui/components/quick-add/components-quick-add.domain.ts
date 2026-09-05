import type { Domain } from "@akasha/domains/domain"

export const componentsQuickAdd = {
  id: "01a071d3-63bd-7123-8d21-2d607ec892bb",
  pageTypeSlug: "domain",
  slug: "components-quick-add",
  definition: "a page made from one line of text",
  partSlugs: [
    "module/compute-quick-add-payload",
    "module/parse-inline-tokens",
    "module/use-active-quick-add-page-type",
    "module/use-inline-completion",
  ],
} as const satisfies Domain

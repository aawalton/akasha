import type { Domain } from "akasha/domains/domain.page-type.ts"

export const pagesUiUnits = {
  id: "01a071d1-781e-7338-87ff-dee331044eb4",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui-units",
  definition: "how much text is read at one time",
  parts: ["module/reading-units"],
} as const satisfies Domain

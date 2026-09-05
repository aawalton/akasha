import type { Domain } from "@akasha/domains/domain"

export const pagesUiCapabilities = {
  id: "01a071cf-40d3-72d4-b353-ded317e501b6",
  pageTypeSlug: "domain",
  slug: "pages-ui-capabilities",
  definition: "what the host a page is drawn in can do",
  partSlugs: ["module/capability-hosts", "module/page-display-registry"],
} as const satisfies Domain

import type { Domain } from "@akasha/domains/domain"

export const pagesUiFrame = {
  id: "01a071cf-928b-7c4c-91ab-a706461ea825",
  pageTypeSlug: "domain",
  slug: "pages-ui-frame",
  definition: "the frame a page is drawn inside",
  partSlugs: [
    "module/display-frame",
    "module/frame-config",
    "module/frame-safe-area-masks",
    "module/frame-sticky-footer",
    "module/frame-sticky-header",
    "module/frame-view-properties-menu",
    "module/use-follow-anchor",
    "module/viewport-thresholds",
  ],
} as const satisfies Domain

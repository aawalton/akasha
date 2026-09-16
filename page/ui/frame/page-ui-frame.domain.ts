import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiFrame = {
  id: "01a071cf-928b-7c4c-91ab-a706461ea825",
  type: "page-type/domain",
  slug: "page-ui-frame",
  definition: "the frame a page is drawn inside",
  parts: [
    "module/display-frame",
    "module/frame-config",
    "module/frame-safe-area-masks",
    "module/frame-sticky-footer",
    "module/frame-sticky-header",
    "module/use-follow-anchor",
    "module/viewport-thresholds",
  ],
} as const satisfies Domain

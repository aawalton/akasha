import type { Domain } from "@akasha/domains/domain"

export const pagesUiStoreRealtime = {
  id: "01a071cc-22d5-7e1b-a68d-925788d75f43",
  pageTypeSlug: "domain",
  slug: "pages-ui-store-realtime",
  definition: "a change arriving from the server as it happens",
  partSlugs: [
    "module/jwt-exp",
    "module/jwt-sub",
    "module/payload-translator",
    "module/shape-meta",
    "module/snapshot-fold",
  ],
} as const satisfies Domain

import type { Domain } from "@akasha/domains/domain"

export const pagesUiStoreCollection = {
  id: "01a071cd-798c-75bd-88c7-7e266f938b90",
  pageTypeSlug: "domain",
  slug: "pages-ui-store-collection",
  definition: "the rows a store keeps for one page type",
  partSlugs: [
    "module/acquire",
    "module/content-persistence",
    "module/fetch-attach",
    "module/file-backing",
    "module/identity-change",
    "module/page-row",
    "module/pages-collection",
    "module/persistence",
    "module/shape-descriptor",
    "module/store",
    "module/sync-controller",
  ],
} as const satisfies Domain

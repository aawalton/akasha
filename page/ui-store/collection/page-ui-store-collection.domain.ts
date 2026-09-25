import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreCollection = {
  id: "01a071cd-798c-75bd-88c7-7e266f938b90",
  type: "page-type/domain",
  slug: "page-ui-store-collection",
  definition: "the rows a store keeps for a page type",
  parts: [
    "module/acquire",
    "module/change-following",
    "module/fetch-attach",
    "module/file-backing",
    "module/identity-change",
    "module/page-row",
    "module/pages-collection",
    "module/persistence",
    "module/shape-descriptor",
    "module/store",
    "module/sync-controller",
    "module/event-source-stream",
  ],
} as const satisfies Domain

import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreCollection = {
  id: "01a071cd-798c-75bd-88c7-7e266f938b90",
  type: "page-type/domain",
  slug: "page-ui-store-collection",
  definition: "the pages a browser keeps for a page type",
  parts: [
    "module/acquire",
    "module/change-following",
    "module/fetch-attach",
    "module/file-backing",
    "module/identity-change",
    "module/page-row",
    "module/pages-collection",
    "module/shape-descriptor",
    "module/store",
    "module/sync-controller",
    "module/event-source-stream",
  ],
  createdAt: "2026-09-05T13:41:26.540Z",
  updatedAt: "2026-09-25T17:26:32.000Z",
} as const satisfies Domain

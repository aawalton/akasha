import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreRealtime = {
  id: "01a071cc-22d5-7e1b-a68d-925788d75f43",
  type: "page-type/domain",
  slug: "page-ui-store-realtime",
  definition: "how a browser learns of a change to a page",
  parts: ["module/jwt-exp", "module/jwt-sub", "module/payload-translator", "module/snapshot-fold"],
  createdAt: "2026-09-05T13:39:58.805Z",
  updatedAt: "2026-09-25T17:27:20.000Z",
} as const satisfies Domain

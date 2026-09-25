import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStoreRealtime = {
  id: "01a071cc-22d5-7e1b-a68d-925788d75f43",
  type: "page-type/domain",
  slug: "page-ui-store-realtime",
  definition: "a change arriving from the server as it happens",
  parts: ["module/jwt-exp", "module/jwt-sub", "module/payload-translator", "module/snapshot-fold"],
} as const satisfies Domain

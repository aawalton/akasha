import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const proposalOverBalance = {
  id: "01a0e3b5-36a5-718d-a9e0-6d2fc2e324a6",
  type: "page-type/web-phrase",
  slug: "proposal-over-balance",
  title: "opening a request costs {cost} points, and {balance} are held",
  createdAt: "2026-09-27T16:31:39.173Z",
  updatedAt: "2026-09-27T16:31:44.000Z",
} as const satisfies WebPhrase

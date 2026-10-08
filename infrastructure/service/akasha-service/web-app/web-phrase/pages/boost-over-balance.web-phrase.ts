import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const boostOverBalance = {
  id: "01a0e3b5-36a5-7c4a-a6cd-7e898bc59798",
  type: "page-type/web-phrase",
  slug: "boost-over-balance",
  title: "{points} points are more than the {balance} held",
  createdAt: "2026-09-27T16:31:39.173Z",
  updatedAt: "2026-09-27T16:31:44.000Z",
} as const satisfies WebPhrase

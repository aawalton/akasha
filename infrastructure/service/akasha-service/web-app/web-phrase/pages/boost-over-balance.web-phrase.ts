import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const boostOverBalance = {
  id: "01a0e3b5-36a5-7c4a-a6cd-7e898bc59798",
  type: "page-type/web-phrase",
  slug: "boost-over-balance",
  title: "{points} points are more than the {balance} held",
} as const satisfies WebPhrase

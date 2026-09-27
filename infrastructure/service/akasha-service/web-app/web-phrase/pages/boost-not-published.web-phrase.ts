import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const boostNotPublished = {
  id: "01a0e3b5-36a5-7e2b-a2ff-823a9a2e4af1",
  type: "page-type/web-phrase",
  slug: "boost-not-published",
  title: "a request Alan has left `{standing}` takes no boost",
} as const satisfies WebPhrase

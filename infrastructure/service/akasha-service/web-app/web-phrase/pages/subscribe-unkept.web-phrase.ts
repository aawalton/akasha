import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const subscribeUnkept = {
  id: "01a0e340-ba02-7a5f-a921-c4e0bdf86864",
  type: "page-type/web-phrase",
  slug: "subscribe-unkept",
  title: "Your address could not be kept just now. Please try again later.",
} as const satisfies WebPhrase

import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestNothingToDo = {
  id: "01a0e340-ba01-729c-9bc9-5871d9b1ffaf",
  type: "page-type/web-phrase",
  slug: "feature-request-nothing-to-do",
  title: "this post says nothing to do",
} as const satisfies WebPhrase

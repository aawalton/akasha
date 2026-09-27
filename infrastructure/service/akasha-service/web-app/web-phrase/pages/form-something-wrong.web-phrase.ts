import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const formSomethingWrong = {
  id: "01a0e340-ba01-78a1-be83-9a7b5d699dcb",
  type: "page-type/web-phrase",
  slug: "form-something-wrong",
  title: "Something went wrong. Please try again.",
} as const satisfies WebPhrase

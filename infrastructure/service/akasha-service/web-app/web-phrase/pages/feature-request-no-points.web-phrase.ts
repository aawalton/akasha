import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestNoPoints = {
  id: "01a0e340-ba01-7f15-b616-391906f8058d",
  type: "page-type/web-phrase",
  slug: "feature-request-no-points",
  title: "how many points to commit is said as a number",
} as const satisfies WebPhrase

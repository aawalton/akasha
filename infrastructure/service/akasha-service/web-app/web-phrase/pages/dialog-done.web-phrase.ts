import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const dialogDone = {
  id: "01a0e340-ba00-7a89-8c9e-ec85b0fad609",
  type: "page-type/web-phrase",
  slug: "dialog-done",
  title: "Done",
} as const satisfies WebPhrase

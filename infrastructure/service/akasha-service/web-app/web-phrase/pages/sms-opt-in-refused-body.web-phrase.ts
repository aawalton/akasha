import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInRefusedBody = {
  id: "01a0e340-ba01-77ef-b219-cc26aea15efe",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-refused-body",
  title:
    "Please enter your name, a valid mobile number, and check the box to agree to receive messages.",
} as const satisfies WebPhrase

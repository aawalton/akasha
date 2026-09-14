import type { Alert } from "akasha/infrastructure/alerts/alert.page-type.types.ts"

export const modelAccountLoginNeeded = {
  id: "01a06755-62f9-7b9d-8e6a-3f512739d02d",
  type: "alert",
  slug: "model-account-login-needed",
  title: "Claude account login needed",
  definition: "a Claude account can no longer log itself back in",
  summary:
    "Claude account {{ $labels.account }} needs a login — access expiry {{ $value | humanizeDuration }} past-due",
  person: "person/alan",
  runbook: "txt",
} as const satisfies Alert

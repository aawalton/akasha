import type { Alert } from "../alert.page-type.ts"

export const claudeAccountLoginNeeded = {
  id: "01a06755-62f9-7b9d-8e6a-3f512739d02d",
  pageTypeSlug: "alert",
  slug: "claude-account-login-needed",
  title: "Claude account login needed",
  definition: "a Claude account can no longer log itself back in",
  summary:
    "Claude account {{ $labels.account }} needs a login — access expiry {{ $value | humanizeDuration }} past-due",
  personSlug: "alan",
  description: "txt",
} as const satisfies Alert

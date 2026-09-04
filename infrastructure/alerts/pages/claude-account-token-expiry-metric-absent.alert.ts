import type { Alert } from "../alert.page-type.ts"

export const claudeAccountTokenExpiryMetricAbsent = {
  id: "01a06755-62f9-7592-a5bb-547779652be0",
  pageTypeSlug: "alert",
  slug: "claude-account-token-expiry-metric-absent",
  title: "Claude account token expiry metric absent",
  definition: "nothing is reporting when the Claude accounts' credentials expire",
  domain: "claude-account",
  summary: "claude-account token-expiry gauge is absent — auth-death alert path blind",
  description: "txt",
} as const satisfies Alert

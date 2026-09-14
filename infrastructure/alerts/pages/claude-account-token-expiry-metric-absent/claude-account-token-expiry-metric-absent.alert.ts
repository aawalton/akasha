import type { Alert } from "akasha/infrastructure/alerts/alert.page-type.types.ts"

export const modelAccountTokenExpiryMetricAbsent = {
  id: "01a06755-62f9-7592-a5bb-547779652be0",
  type: "alert",
  slug: "model-account-token-expiry-metric-absent",
  title: "Claude account token expiry metric absent",
  definition: "nothing is reporting when the Claude accounts' credentials expire",
  domain: "model-account",
  summary: "model-account token-expiry gauge is absent — auth-death alert path blind",
  runbook: "txt",
} as const satisfies Alert

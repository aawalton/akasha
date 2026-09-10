import type { Secret } from "../secret.page-type.types.ts"

export const grafanaSecretsGrafanaAdminPassword = {
  id: "01a0769b-210f-775e-b3ba-c9405d6ac0c0",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "grafana-secrets-grafana-admin-password",
  placements: [{ resourceName: "grafana-secrets", resourceKey: "GRAFANA_ADMIN_PASSWORD" }],
} as const satisfies Secret

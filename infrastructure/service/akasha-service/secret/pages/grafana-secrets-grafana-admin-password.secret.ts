import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const grafanaSecretsGrafanaAdminPassword = {
  id: "01a0769b-210f-775e-b3ba-c9405d6ac0c0",
  type: "page-type/secret",
  slug: "grafana-secrets-grafana-admin-password",
  placements: [{ resourceName: "grafana-secrets", resourceKey: "GRAFANA_ADMIN_PASSWORD" }],
  createdAt: "2026-09-06T12:04:33.167Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret

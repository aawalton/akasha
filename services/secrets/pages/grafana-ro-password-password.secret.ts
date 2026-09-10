import type { Secret } from "../secret.page-type.types.ts"

export const grafanaRoPasswordPassword = {
  id: "01a0769a-a7e7-7c45-adb1-ad104f4a8ca0",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "grafana-ro-password-password",
  placements: [
    { resourceName: "grafana-ro-password", resourceKey: "password" },
    { resourceName: "grafana-secrets", resourceKey: "GRAFANA_DB_RO_PASSWORD" },
  ],
} as const satisfies Secret

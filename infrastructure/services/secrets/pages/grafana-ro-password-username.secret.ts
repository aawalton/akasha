import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const grafanaRoPasswordUsername = {
  id: "01a0769a-c690-792a-9d36-f03a3c409ec6",
  type: "secret",
  slug: "grafana-ro-password-username",
  placements: [{ resourceName: "grafana-ro-password", resourceKey: "username" }],
} as const satisfies Secret

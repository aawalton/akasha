import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const collectionsSecretsServiceRoleKey = {
  id: "01a076b7-b672-7b47-a270-e5f998b2bc48",
  type: "page-type/secret",
  slug: "collections-secrets-service-role-key",
  placements: [{ resourceName: "collections-secrets", resourceKey: "SERVICE_ROLE_KEY" }],
} as const satisfies Secret

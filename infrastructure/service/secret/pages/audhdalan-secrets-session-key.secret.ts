import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const audhdalanSecretsSessionKey = {
  id: "01a0bb31-3e12-72e3-9c2b-4264386b97e7",
  type: "page-type/secret",
  slug: "audhdalan-secrets-session-key",
  placements: [{ resourceName: "audhdalan-secrets", resourceKey: "AUDHDALAN_SESSION_KEY" }],
} as const satisfies Secret

import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsHandoverPublicKey = {
  id: "01a0bb3b-8876-7017-87ed-af40c2ec8571",
  type: "page-type/secret",
  slug: "alanwalton-secrets-handover-public-key",
  placements: [
    { resourceName: "alanwalton-secrets", resourceKey: "HANDOVER_PUBLIC_KEY" },
    { resourceName: "temper-secrets", resourceKey: "HANDOVER_PUBLIC_KEY" },
    { resourceName: "archive-of-worlds-secrets", resourceKey: "HANDOVER_PUBLIC_KEY" },
    { resourceName: "audhdalan-secrets", resourceKey: "HANDOVER_PUBLIC_KEY" },
  ],
} as const satisfies Secret

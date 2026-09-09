import type { Secret } from "../secret.page-type.ts"

export const supabaseStudioSecretsPgMetaCryptoKey = {
  id: "01a06832-cf2d-7c5c-b559-60f87900de9e",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "supabase-studio-secrets-pg-meta-crypto-key",
  placements: [{ resourceName: "supabase-studio-secrets", resourceKey: "PG_META_CRYPTO_KEY" }],
} as const satisfies Secret

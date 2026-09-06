import type { Secret } from "../secret.page-type.ts"

export const pipelineEngineSecretsAgeSecretKey = {
  id: "01a076b8-884b-7b7b-9774-036c6cfd9e2c",
  pageTypeSlug: "secret",
  slug: "pipeline-engine-secrets-age-secret-key",
  placements: [{ resourceName: "pipeline-engine-secrets", resourceKey: "AGE_SECRET_KEY" }],
} as const satisfies Secret

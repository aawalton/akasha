import type { Secret } from "../secret.page-type.ts"

export const pipelineEngineSecretsDatabaseUrl = {
  id: "01a076b8-9de8-7ebf-be45-7566df33851d",
  pageTypeSlug: "secret",
  slug: "pipeline-engine-secrets-database-url",
  placements: [{ resourceName: "pipeline-engine-secrets", resourceKey: "DATABASE_URL" }],
} as const satisfies Secret

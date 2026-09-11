import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const collectionsSecretsGithubToken = {
  id: "01a076b6-8034-71be-ba44-133725a3204e",
  type: "secret",
  slug: "collections-secrets-github-token",
  placements: [{ resourceName: "collections-secrets", resourceKey: "GITHUB_TOKEN" }],
} as const satisfies Secret

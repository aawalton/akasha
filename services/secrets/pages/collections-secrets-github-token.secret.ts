import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsGithubToken = {
  id: "01a076b6-8034-71be-ba44-133725a3204e",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-github-token",
  placements: [{ resourceName: "collections-secrets", resourceKey: "GITHUB_TOKEN" }],
} as const satisfies Secret

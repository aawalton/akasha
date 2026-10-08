import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const gitTransportSecretsGithubAccessToken = {
  id: "01a06832-cf2d-7705-b185-355420d39757",
  type: "page-type/secret",
  slug: "git-transport-secrets-github-access-token",
  placements: [{ resourceName: "git-transport-secrets", resourceKey: "GITHUB_ACCESS_TOKEN" }],
  createdAt: "2026-09-03T16:55:55.437Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret

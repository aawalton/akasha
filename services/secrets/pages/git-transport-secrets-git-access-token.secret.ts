import type { Secret } from "../secret.page-type.types.ts"

export const gitTransportSecretsGitAccessToken = {
  id: "01a06832-cf2d-7c2b-a782-eb5f6fc1dc27",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "git-transport-secrets-git-access-token",
  placements: [
    { resourceName: "git-transport-secrets", resourceKey: "GIT_ACCESS_TOKEN" },
    { resourceName: "alanwalton-secrets", resourceKey: "GIT_ACCESS_TOKEN" },
    { resourceName: "temper-secrets", resourceKey: "GIT_ACCESS_TOKEN" },
    { resourceName: "smilingjenny-secrets", resourceKey: "GIT_ACCESS_TOKEN" },
    { resourceName: "audhdalan-secrets", resourceKey: "GIT_ACCESS_TOKEN" },
    { resourceName: "archive-of-worlds-secrets", resourceKey: "GIT_ACCESS_TOKEN" },
  ],
} as const satisfies Secret

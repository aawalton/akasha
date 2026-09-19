import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const archiveOfWorldsSecretsSessionKey = {
  id: "01a0bb31-2a7d-7227-8c40-0d807ff665f1",
  type: "page-type/secret",
  slug: "archive-of-worlds-secrets-session-key",
  placements: [
    { resourceName: "archive-of-worlds-secrets", resourceKey: "ARCHIVE_OF_WORLDS_SESSION_KEY" },
  ],
} as const satisfies Secret

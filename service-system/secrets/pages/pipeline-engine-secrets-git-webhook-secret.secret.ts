import type { Secret } from "../secret.page-type.ts"

export const pipelineEngineSecretsGitWebhookSecret = {
  id: "01a076b8-b2da-7ca2-ae73-2de5220aed79",
  pageTypeSlug: "secret",
  slug: "pipeline-engine-secrets-git-webhook-secret",
  placements: [{ resourceName: "pipeline-engine-secrets", resourceKey: "GIT_WEBHOOK_SECRET" }],
} as const satisfies Secret

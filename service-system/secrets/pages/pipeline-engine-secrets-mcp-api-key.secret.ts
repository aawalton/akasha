import type { Secret } from "../secret.page-type.ts"

export const pipelineEngineSecretsMcpApiKey = {
  id: "01a076b8-c99e-7131-9583-f1eb92ab5dbb",
  pageTypeSlug: "secret",
  slug: "pipeline-engine-secrets-mcp-api-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "MCP_API_KEY" }],
} as const satisfies Secret

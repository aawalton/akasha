import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsMcpApiKey = {
  id: "01a076b8-c99e-7131-9583-f1eb92ab5dbb",
  type: "page-type/secret",
  slug: "alanwalton-secrets-mcp-api-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "MCP_API_KEY" }],
  createdAt: "2026-09-06T12:36:56.862Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret

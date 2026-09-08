import type { SecretRef } from "../workflow-types/workflow-types.module.code.ts"

export const SECRETS = {
  AGE_SECRET_KEY: "AGE_SECRET_KEY",
  MCP_API_KEY: "MCP_API_KEY",
  ALANWALTON_SERVICE_ROLE_KEY: "ALANWALTON_SERVICE_ROLE_KEY",
  CLOUDFLARE_API_TOKEN: "CLOUDFLARE_API_TOKEN",
  SUPABASE_URL: "SUPABASE_URL",
  SUPABASE_SERVICE_ROLE_KEY: "SUPABASE_SERVICE_ROLE_KEY",
} as const

export function secret(name: string): SecretRef {
  return { fromSecret: name }
}

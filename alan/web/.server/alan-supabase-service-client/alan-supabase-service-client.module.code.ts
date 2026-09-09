import {
  createServiceRoleClient,
  type SupabaseServiceRoleClient,
} from "akasha/alan/harness/supabase-server/service-role/service-role.module.code.ts"

let client: SupabaseServiceRoleClient | null = null

export function getSupabaseServiceClient(): SupabaseServiceRoleClient {
  if (!client) {
    client = createServiceRoleClient()
  }
  return client
}

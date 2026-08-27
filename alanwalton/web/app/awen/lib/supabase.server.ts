import { createServiceRoleClient, type SupabaseServiceRoleClient } from "../../../../../shared/supabase-server/src/service-role"

let client: SupabaseServiceRoleClient | null = null

export function getSupabaseServiceClient(): SupabaseServiceRoleClient {
  if (!client) {
    client = createServiceRoleClient()
  }
  return client
}

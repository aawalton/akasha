import {
  createServiceRoleClient,
  type SupabaseServiceRoleClient,
} from "@akasha/supabase-server/service-role"

let client: SupabaseServiceRoleClient | null = null

export function getSupabaseServiceClient(): SupabaseServiceRoleClient {
  if (!client) {
    client = createServiceRoleClient()
  }
  return client
}

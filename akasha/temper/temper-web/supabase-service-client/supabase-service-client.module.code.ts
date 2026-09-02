import {
  createServiceRoleClient,
  type SupabaseServiceRoleClient,
} from "@akasha/supabase-server/service-role"
import { z } from "zod"

const OPTIONAL_ENV_SCHEMA = z.string().optional()

let client: SupabaseServiceRoleClient | null = null

export function getSupabaseServiceClient(): SupabaseServiceRoleClient {
  if (!client) {
    const internalUrl = OPTIONAL_ENV_SCHEMA.parse(process.env.SUPABASE_INTERNAL_URL)
    const publicUrl = OPTIONAL_ENV_SCHEMA.parse(process.env.NEXT_PUBLIC_SUPABASE_URL)
    const url = internalUrl ?? publicUrl
    client = createServiceRoleClient({ url })
  }
  return client
}

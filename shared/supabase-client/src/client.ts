import type { Database } from "../../supabase-database/src/generated/database"
import {
  createClient as createSupabaseClient,
  type SupabaseClient,
  type SupportedStorage,
} from "@supabase/supabase-js"

export type SupabaseUserClient = SupabaseClient<Database>

export type CreateClientOptions = {
  storage?: SupportedStorage
  storageKey?: string
}

export function createClient(
  url: string,
  anonKey: string,
  options: CreateClientOptions = {}
): SupabaseUserClient {
  return createSupabaseClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storage: options.storage,
      storageKey: options.storageKey,
    },
  })
}

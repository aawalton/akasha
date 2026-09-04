import {
  createClient as createSupabaseClient,
  type SupabaseClient,
  type SupportedStorage,
} from "@supabase/supabase-js"

export type SupabaseUserClient = SupabaseClient

export type CreateClientOptions = {
  storage?: SupportedStorage
  storageKey?: string
}

export function createClient(
  url: string,
  anonKey: string,
  options: CreateClientOptions = {}
): SupabaseUserClient {
  return createSupabaseClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storage: options.storage,
      storageKey: options.storageKey,
    },
  })
}

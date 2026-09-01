import type { Database } from "@akasha/supabase-database"
import type { SupabaseClient } from "@supabase/supabase-js"

export type SmsAllowlistClient = SupabaseClient<Database>
